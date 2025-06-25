from flask_sqlalchemy import SQLAlchemy
import datetime
import bcrypt

db = SQLAlchemy()#Inicializa la instancia de SQLAlchemy

class Usuario(db.Model):
    """Modelo que representa un usuario del sistema"""
    __tablename__ = 'usuario'
    
    id_usuario = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    
    # Relaciones
    cuestionarios = db.relationship('Cuestionario', backref='usuario', lazy=True,cascade="all, delete")
    
    def __init__(self, username, correo, contrasena):
        """Inicializa un nuevo usuario con un nombre de usuario, correo y contraseña"""
        self.username = username
        self.correo = correo
        self.set_password(contrasena)
    
    def set_password(self, password):
        """Hashea y almacena la contraseña"""
        salt = bcrypt.gensalt()
        self.contrasena = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    def check_password(self, password):
        """Verifica la contraseña"""
        return bcrypt.checkpw(password.encode('utf-8'), self.contrasena.encode('utf-8'))
    
    def to_dict(self):
        """Convierte el objeto Usuario a un diccionario"""
        return {
            'id_usuario': self.id_usuario,
            'username': self.username,
            'correo': self.correo
        }

class Cuestionario(db.Model):
    """Modelo que representa un cuestionario"""
    __tablename__ = 'cuestionario'
    
    id_cuestionario = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, nullable=False, default=datetime.date.today())
    hora = db.Column(db.Time, nullable=False, default=datetime.datetime.now().time())
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'), nullable=False)
    
    # Relaciones
    resultados = db.relationship('Resultado', backref='cuestionario', lazy=True , cascade="all, delete")
    respuestas = db.relationship('Respuesta', backref='cuestionario', lazy=True , cascade="all, delete")
    
    def to_dict(self):
        """Convierte el objeto Cuestionario a un diccionario"""
        return {
            'id_cuestionario': self.id_cuestionario,
            'fecha': self.fecha.isoformat() if self.fecha else None,
            'hora': self.hora.isoformat() if self.hora else None,
            'id_usuario': self.id_usuario
        }

class Pregunta(db.Model):
    """Modelo que representa una pregunta dentro de un cuestionario"""
    __tablename__ = 'pregunta'
    
    id_pregunta = db.Column(db.Integer, primary_key=True)
    nom_pregunta = db.Column(db.String(255), nullable=False)
    
    # Relaciones
    respuestas = db.relationship('Respuesta', backref='pregunta', lazy=True)
    
    def to_dict(self):
        """Convierte el objeto Pregunta a un diccionario"""
        return {
            'id_pregunta': self.id_pregunta,
            'nom_pregunta': self.nom_pregunta
        }

class Respuesta(db.Model):
    """Modelo que representa una respuesta a una pregunta en un cuestionario"""
    __tablename__ = 'respuesta'
    
    id_respuesta = db.Column(db.Integer, primary_key=True)
    respuesta_str = db.Column(db.String(255), nullable=False)
    id_cuestionario = db.Column(db.Integer, db.ForeignKey('cuestionario.id_cuestionario'), nullable=False)
    id_pregunta = db.Column(db.Integer, db.ForeignKey('pregunta.id_pregunta'), nullable=False)
    
    def to_dict(self):
        """Convierte el objeto Respuesta a un diccionario"""
        return {
            'id_respuesta': self.id_respuesta,
            'respuesta_str': self.respuesta_str,
            'id_cuestionario': self.id_cuestionario,
            'id_pregunta': self.id_pregunta
        }

class Resultado(db.Model):
    """Modelo que representa el resultado de un cuestionario"""
    __tablename__ = 'resultado'
    
    id_resultado = db.Column(db.Integer, primary_key=True)
    prediccion = db.Column(db.String(50), nullable=False)
    id_cuestionario = db.Column(db.Integer, db.ForeignKey('cuestionario.id_cuestionario'), nullable=False)
    
    def to_dict(self):
        """Convierte el objeto Resultado a un diccionario"""
        return {
            'id_resultado': self.id_resultado,
            'prediccion': self.prediccion,
            'id_cuestionario': self.id_cuestionario
        }