from flask import Flask, jsonify
from flask_cors import CORS
from database.models import db
from routes.auth import auth_bp
from routes.prediction import prediction_bp
from routes.questions import questions_bp
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()


app = Flask(__name__)

# Configuración de la aplicación
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'clave-secreta-por-defecto-cambiar-en-produccion')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://usuario:password@localhost:5432/diabetes_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración de sesiones
app.config['SESSION_COOKIE_SECURE'] = True 
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Configurar CORS
frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
CORS(app, 
        origins=[frontend_url],
        supports_credentials=True,
        allow_headers=['Content-Type', 'Authorization'],
        methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# Inicializar base de datos
db.init_app(app)

# Registrar blueprints
app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
app.register_blueprint(prediction_bp, url_prefix='/api/v1')
app.register_blueprint(questions_bp, url_prefix='/api/v1')

# Ruta de salud (health check)
@app.route('/api/v1/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'message': 'API de Predicción de Diabetes funcionando correctamente',
        'version': '1.0.0'
    }), 200

# Ruta raíz
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'API de Predicción de Diabetes',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/v1/health',
            'auth': {
                'login': '/api/v1/auth/login',
                'register': '/api/v1/auth/register',
                'logout': '/api/v1/auth/logout',
                'me': '/api/v1/auth/me',
                'check': '/api/v1/auth/check'
            },
            'prediction': {
                'predict': '/api/v1/prediccion',
                'history': '/api/v1/historial',
                'detail': '/api/v1/cuestionario/<id>',
                'model_info': '/api/v1/modelo/info',
                'test': '/api/v1/test'
            },
            'questions': {
                'list': '/api/v1/preguntas',
                'create': '/api/v1/preguntas',
                'get': '/api/v1/preguntas/<id>',
                'update': '/api/v1/preguntas/<id>',
                'delete': '/api/v1/preguntas/<id>'
            }
        }
    }), 200

# Manejo de errores globales
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint no encontrado',
        'message': 'La ruta solicitada no existe'
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        'error': 'Método no permitido',
        'message': 'El método HTTP no está permitido para esta ruta'
    }), 405

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({
        'error': 'Error interno del servidor',
        'message': 'Ha ocurrido un error inesperado'
    }), 500

# Crear tablas si no existen
with app.app_context():
    try:
        db.create_all()
        print("✅ Tablas de base de datos creadas exitosamente")
    except Exception as e:
        print(f"❌ Error al crear tablas: {e}")


if __name__ == '__main__':
    # Configuración para desarrollo
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '127.0.0.1')
    
    print(f"🚀 Iniciando servidor en http://{host}:{port}")
    print(f"🔧 Modo debug: {debug_mode}")
    print(f"🌐 CORS habilitado para: {os.getenv('FRONTEND_URL', 'http://localhost:3000')}")
    
    app.run(
        host=host,
        port=port,
        debug=debug_mode
    )