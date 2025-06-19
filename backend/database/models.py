from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import bcrypt

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuario'
    
    id_usuario = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    
    # Relaciones
    cuestionarios = db.relationship('Cuestionario', backref='usuario', lazy=True)
    
    def __init__(self, username, correo, contrasena):
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
        return {
            'ID_usuario': self.ID_usuario,
            'username': self.username,
            'correo': self.correo
        }

class Cuestionario(db.Model):
    __tablename__ = 'cuestionario'
    
    id_cuestionario = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    hora = db.Column(db.Time, nullable=False, default=datetime.utcnow().time)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'), nullable=False)
    
    # Relaciones
    resultados = db.relationship('Resultado', backref='cuestionario', lazy=True)
    respuestas = db.relationship('Respuesta', backref='cuestionario', lazy=True)
    
    def to_dict(self):
        return {
            'id_cuestionario': self.id_cuestionario,
            'fecha': self.fecha.isoformat() if self.fecha else None,
            'hora': self.hora.isoformat() if self.hora else None,
            'id_usuario': self.id_usuario
        }

class Pregunta(db.Model):
    __tablename__ = 'pregunta'
    
    id_pregunta = db.Column(db.Integer, primary_key=True)
    nom_pregunta = db.Column(db.String(255), nullable=False)
    
    # Relaciones
    respuestas = db.relationship('Respuesta', backref='pregunta', lazy=True)
    
    def to_dict(self):
        return {
            'id_pregunta': self.id_pregunta,
            'nom_pregunta': self.nom_pregunta
        }

class Respuesta(db.Model):
    __tablename__ = 'respuesta'
    
    id_respuesta = db.Column(db.Integer, primary_key=True)
    respuesta_str = db.Column(db.String(255), nullable=False)
    id_cuestionario = db.Column(db.Integer, db.ForeignKey('cuestionario.id_cuestionario'), nullable=False)
    id_pregunta = db.Column(db.Integer, db.ForeignKey('pregunta.id_pregunta'), nullable=False)
    
    def to_dict(self):
        return {
            'id_respuesta': self.id_respuesta,
            'respuesta_str': self.respuesta_str,
            'id_cuestionario': self.id_cuestionario,
            'id_pregunta': self.id_pregunta
        }

class Resultado(db.Model):
    __tablename__ = 'resultado'
    
    id_resultado = db.Column(db.Integer, primary_key=True)
    prediccion = db.Column(db.String(50), nullable=False)
    id_cuestionario = db.Column(db.Integer, db.ForeignKey('cuestionario.id_cuestionario'), nullable=False)
    
    def to_dict(self):
        return {
            'id_resultado': self.id_resultado,
            'prediccion': self.prediccion,
            'id_cuestionario': self.id_cuestionario
        }