from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from datetime import datetime
from schemas.schemas import PrediccionInput, PrediccionResponse, CuestionarioInput
from services.auth_service import AuthService
from services.model_service import model_service
from database.models import db, Cuestionario, Resultado, Respuesta, Pregunta

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/prediccion', methods=['POST'])
def predict_diabetes():
    """Endpoint principal para predicción de diabetes"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Obtener usuario actual
        usuario_actual = AuthService.get_current_user()
        
        # Validar datos de entrada con Pydantic
        prediction_data = PrediccionInput(**request.get_json())
        
        # Crear nuevo cuestionario
        nuevo_cuestionario = Cuestionario(
            fecha=datetime.now().date(),
            hora=datetime.now().time(),
            id_usuario=usuario_actual.id_usuario
        )
        db.session.add(nuevo_cuestionario)
        db.session.flush()  # Para obtener el ID sin hacer commit
        
        # Realizar predicción
        prediction_result = model_service.predict(prediction_data.dict())
        
        # Guardar resultado
        nuevo_resultado = Resultado(
            prediccion=prediction_result['prediccion'],
            id_cuestionario=nuevo_cuestionario.id_cuestionario
        )
        db.session.add(nuevo_resultado)
        
        # Guardar respuestas individuales (opcional, basado en los campos de entrada)
        field_mapping = {
            'pregnancies': 'Número de embarazos',
            'glucose': 'Nivel de glucosa',
            'blood_pressure': 'Presión arterial',
            'insulin': 'Nivel de insulina',
            'bmi': 'Índice de masa corporal',
            'diabetes_pedigree_function': 'Función de pedigrí de diabetes',
            'age': 'Edad'
        }
        
        for field, question_text in field_mapping.items():
            if hasattr(prediction_data, field):
                value = getattr(prediction_data, field)
                if value is not None:
                    # Buscar o crear pregunta
                    pregunta = Pregunta.query.filter_by(nom_pregunta=question_text).first()
                    if not pregunta:
                        pregunta = Pregunta(nom_pregunta=question_text)
                        db.session.add(pregunta)
                        db.session.flush()
                    
                    # Crear respuesta
                    respuesta = Respuesta(
                        respuesta_str=str(value),
                        id_cuestionario=nuevo_cuestionario.id_cuestionario,
                        id_pregunta=pregunta.id_pregunta
                    )
                    db.session.add(respuesta)
        
        # Confirmar todas las operaciones
        db.session.commit()
        
        return jsonify({
            'prediccion': prediction_result['prediccion'],
            'probabilidad': prediction_result.get('probabilidad'),
            'id_cuestionario': nuevo_cuestionario.id_cuestionario,
            'fecha': nuevo_cuestionario.fecha.isoformat(),
            'hora': nuevo_cuestionario.hora.isoformat()
        }), 200
        
    except ValidationError as e:
        db.session.rollback()
        return jsonify({
            'error': 'Datos de entrada inválidos',
            'detalle': e.errors()
        }), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': 'Error en la predicción',
            'detalle': str(e)
        }), 500

@prediction_bp.route('/historial', methods=['GET'])
def get_prediction_history():
    """Endpoint para obtener el historial de predicciones del usuario"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Obtener usuario actual
        usuario_actual = AuthService.get_current_user()
        
        # Obtener cuestionarios del usuario con sus resultados
        cuestionarios = db.session.query(Cuestionario, Resultado)\
            .join(Resultado, Cuestionario.id_cuestionario == Resultado.id_cuestionario)\
            .filter(Cuestionario.id_usuario == usuario_actual.id_usuario)\
            .order_by(Cuestionario.fecha.desc(), Cuestionario.hora.desc())\
            .all()
        
        historial = []
        for cuestionario, resultado in cuestionarios:
            historial.append({
                'id_cuestionario': cuestionario.id_cuestionario,
                'fecha': cuestionario.fecha.isoformat(),
                'hora': cuestionario.hora.isoformat(),
                'prediccion': resultado.prediccion,
                'id_resultado': resultado.id_resultado
            })
        
        return jsonify({
            'historial': historial,
            'total': len(historial)
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error al obtener historial',
            'detalle': str(e)
        }), 500

@prediction_bp.route('/cuestionario/<int:cuestionario_id>', methods=['GET'])
def get_cuestionario_detail(cuestionario_id):
    """Endpoint para obtener detalles de un cuestionario específico"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Obtener usuario actual
        usuario_actual = AuthService.get_current_user()
        
        # Obtener cuestionario con verificación de pertenencia al usuario
        cuestionario = Cuestionario.query.filter_by(
            id_cuestionario=cuestionario_id,
            id_usuario=usuario_actual.id_usuario
        ).first()
        
        if not cuestionario:
            return jsonify({
                'error': 'Cuestionario no encontrado'
            }), 404
        
        # Obtener respuestas del cuestionario
        respuestas = db.session.query(Respuesta, Pregunta)\
            .join(Pregunta, Respuesta.id_pregunta == Pregunta.id_pregunta)\
            .filter(Respuesta.id_cuestionario == cuestionario_id)\
            .all()
        
        # Obtener resultado
        resultado = Resultado.query.filter_by(id_cuestionario=cuestionario_id).first()

        respuestas_detalle = []
        for respuesta, pregunta in respuestas:
            respuestas_detalle.append({
                'pregunta': pregunta.nom_pregunta,
                'respuesta': respuesta.respuesta_str,
                'id_pregunta': pregunta.id_pregunta
            })
        
        return jsonify({
            'cuestionario': {
                'id_cuestionario': cuestionario.id_cuestionario,
                'fecha': cuestionario.fecha.isoformat(),
                'hora': cuestionario.hora.isoformat(),
                'id_usuario': cuestionario.id_usuario
            },
            'respuestas': respuestas_detalle,
            'resultado': {
                'prediccion': resultado.prediccion,
                'id_resultado': resultado.id_resultado
            } if resultado else None
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error al obtener detalles del cuestionario',
            'detalle': str(e)
        }), 500

@prediction_bp.route('/modelo/info', methods=['GET'])
def get_model_info():
    """Endpoint para obtener información del modelo cargado"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        model_info = model_service.get_model_info()
        
        return jsonify({
            'modelo': model_info
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error al obtener información del modelo',
            'detalle': str(e)
        }), 500

@prediction_bp.route('/test', methods=['POST'])
def test_prediction():
    """Endpoint de prueba para la predicción (sin guardar en BD)"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Validar datos de entrada
        prediction_data = PrediccionInput(**request.get_json())
        
        # Realizar predicción sin guardar
        prediction_result = model_service.predict(prediction_data.dict())
        
        return jsonify({
            'prediccion': prediction_result['prediccion'],
            'probabilidad': prediction_result.get('probabilidad'),
            'raw_prediction': prediction_result.get('raw_prediction'),
            'test_mode': True
        }), 200
        
    except ValidationError as e:
        return jsonify({
            'error': 'Datos de entrada inválidos',
            'detalle': e.errors()
        }), 400
    except Exception as e:
        return jsonify({
            'error': 'Error en la predicción de prueba',
            'detalle': str(e)
        }), 500