from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from schemas.schemas import UsuarioLogin, UsuarioRegistro, LoginResponse, ErrorResponse , UsuarioActualizar
from services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Endpoint para iniciar sesión"""
    try:
        # Validar datos de entrada con Pydantic
        login_data = UsuarioLogin(**request.get_json())
        
        # Intentar login
        result = AuthService.login_user(login_data)
        
        if result['success']:
            return jsonify({
                'mensaje': result['message'],
                'usuario': result['usuario']
            }), 200
        else:
            return jsonify({
                'error': result['message']
            }), 401
            
    except ValidationError as e:
        return jsonify({
            'error': 'Datos de entrada inválidos',
            'detalle': e.errors()
        }), 400
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e)
        }), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    """Endpoint para registrar un nuevo usuario"""
    try:
        # Validar datos de entrada con Pydantic
        registro_data = UsuarioRegistro(**request.get_json())
        
        # Intentar registro
        result = AuthService.register_user(registro_data)
        
        if result['success']:
            return jsonify({
                'mensaje': result['message'],
                'usuario': result['usuario']
            }), 201
        else:
            return jsonify({
                'error': result['message']
            }), 400
            
    except ValidationError as e:
        return jsonify({
            'error': 'Datos de entrada inválidos',
            'detalle': e.errors()
        }), 400
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e)
        }), 500
@auth_bp.route('/', methods=['DELETE'])
def delete_user():
    """Endpoint para eliminar un usuario"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Obtener usuario actual
        usuario = AuthService.get_current_user()
        # Eliminar usuario
        result = AuthService.delete_user(usuario.id_usuario)

        if result['success']:
            return jsonify({
                'mensaje': result['message']
            }), 200
        else:
            return jsonify({
                'error': result['message']
            }), 500
            
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e)
        }), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Endpoint para cerrar sesión"""
    try:
        result = AuthService.logout_user()
        
        if result['success']:
            return jsonify({
                'mensaje': result['message']
            }), 200
        else:
            return jsonify({
                'error': result['message']
            }), 500
            
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e)
        }), 500

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    """Endpoint para obtener información del usuario actual"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Obtener usuario actual
        usuario = AuthService.get_current_user()
        
        if usuario:
            return jsonify({
                'usuario': usuario.to_dict()
            }), 200
        else:
            return jsonify({
                'error': 'Usuario no encontrado'
            }), 404
            
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e)
        }), 500

@auth_bp.route('/check', methods=['GET'])
def check_auth():
    """Endpoint para verificar si el usuario está autenticado"""
    try:
        is_authenticated = AuthService.is_authenticated()
        
        return jsonify({
            'authenticated': is_authenticated,
            'usuario': AuthService.get_current_user().to_dict() if is_authenticated else None
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e)
        }), 500

@auth_bp.route('/', methods=['PATCH']) 
def update_user():
    """Endpoint para actualizar información del usuario"""
    try:
        # Verificar autenticación
        auth_error = AuthService.require_auth()
        if auth_error:
            return jsonify({
                'error': auth_error['message']
            }), 401
        
        # Obtener usuario actual
        usuario = AuthService.get_current_user()
        
        # Validar datos de entrada con Pydantic
        update_data = UsuarioActualizar(**request.get_json())
        
        # Actualizar usuario
        result = AuthService.update_user(usuario.id_usuario, update_data)
        
        if result['success']:
            return jsonify({
                'mensaje': result['message'],
                'usuario': result['usuario']
            }), 200
        else:
            return jsonify({
                'error': result['message']
            }), 400
            
    except ValidationError as e:
        return jsonify({
            'error': 'Datos de entrada inválidos',
            'detalle': e.errors()
        }), 400
    except Exception as e:
        return jsonify({
            'error': 'Error interno del servidor',
            'detalle': str(e)
        }), 500
