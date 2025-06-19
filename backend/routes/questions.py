from flask import Blueprint, request, jsonify
from services.auth_service import AuthService
from database.models import db, Pregunta

questions_bp = Blueprint('questions', __name__)

@questions_bp.route('/preguntas', methods=['GET'])
def get_all_questions():
    """Endpoint para obtener todas las preguntas disponibles"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Obtener todas las preguntas
        preguntas = Pregunta.query.all()
        
        preguntas_list = []
        for pregunta in preguntas:
            preguntas_list.append(pregunta.to_dict())
        
        return jsonify({
            'preguntas': preguntas_list,
            'total': len(preguntas_list)
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error al obtener preguntas',
            'detalle': str(e)
        }), 500

@questions_bp.route('/preguntas', methods=['POST'])
def create_question():
    """Endpoint para crear una nueva pregunta"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        data = request.get_json()
        
        if not data or 'nom_pregunta' not in data:
            return jsonify({
                'error': 'El nombre de la pregunta es requerido'
            }), 400
        
        # Verificar si la pregunta ya existe
        existing_question = Pregunta.query.filter_by(nom_pregunta=data['nom_pregunta']).first()
        if existing_question:
            return jsonify({
                'error': 'La pregunta ya existe'
            }), 400
        
        # Crear nueva pregunta
        nueva_pregunta = Pregunta(nom_pregunta=data['nom_pregunta'])
        db.session.add(nueva_pregunta)
        db.session.commit()
        
        return jsonify({
            'mensaje': 'Pregunta creada exitosamente',
            'pregunta': nueva_pregunta.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': 'Error al crear pregunta',
            'detalle': str(e)
        }), 500

@questions_bp.route('/preguntas/<int:pregunta_id>', methods=['GET'])
def get_question(pregunta_id):
    """Endpoint para obtener una pregunta específica"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        pregunta = Pregunta.query.get(pregunta_id)
        
        if not pregunta:
            return jsonify({
                'error': 'Pregunta no encontrada'
            }), 404
        
        return jsonify({
            'pregunta': pregunta.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error al obtener pregunta',
            'detalle': str(e)
        }), 500

@questions_bp.route('/preguntas/<int:pregunta_id>', methods=['PUT'])
def update_question(pregunta_id):
    """Endpoint para actualizar una pregunta"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        pregunta = Pregunta.query.get(pregunta_id)
        
        if not pregunta:
            return jsonify({
                'error': 'Pregunta no encontrada'
            }), 404
        
        data = request.get_json()
        
        if not data or 'nom_pregunta' not in data:
            return jsonify({
                'error': 'El nombre de la pregunta es requerido'
            }), 400
        
        # Verificar si el nuevo nombre ya existe (excluyendo la pregunta actual)
        existing_question = Pregunta.query.filter(
            Pregunta.nom_pregunta == data['nom_pregunta'],
            Pregunta.id_pregunta != pregunta_id
        ).first()
        
        if existing_question:
            return jsonify({
                'error': 'Ya existe una pregunta con ese nombre'
            }), 400
        
        # Actualizar pregunta
        pregunta.nom_pregunta = data['nom_pregunta']
        db.session.commit()
        
        return jsonify({
            'mensaje': 'Pregunta actualizada exitosamente',
            'pregunta': pregunta.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': 'Error al actualizar pregunta',
            'detalle': str(e)
        }), 500

@questions_bp.route('/preguntas/<int:pregunta_id>', methods=['DELETE'])
def delete_question(pregunta_id):
    """Endpoint para eliminar una pregunta"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        pregunta = Pregunta.query.get(pregunta_id)
        
        if not pregunta:
            return jsonify({
                'error': 'Pregunta no encontrada'
            }), 404
        
        # Verificar si la pregunta tiene respuestas asociadas
        if pregunta.respuestas:
            return jsonify({
                'error': 'No se puede eliminar la pregunta porque tiene respuestas asociadas'
            }), 400
        
        # Eliminar pregunta
        db.session.delete(pregunta)
        db.session.commit()
        
        return jsonify({
            'mensaje': 'Pregunta eliminada exitosamente'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': 'Error al eliminar pregunta',
            'detalle': str(e)
        }), 500