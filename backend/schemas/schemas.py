from pydantic import BaseModel, EmailStr, field_validator
from typing import List, Optional
from datetime import date, time

class UsuarioLogin(BaseModel):
    username: str
    contrasena: str
    
    @field_validator('username')
    def username_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('El username no puede estar vacío')
        return v.strip()

class UsuarioRegistro(BaseModel):
    username: str
    correo: EmailStr
    contrasena: str
    
    @field_validator('username')
    def username_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('El username no puede estar vacío')
        return v.strip()
    
    @field_validator('contrasena')
    def password_must_be_strong(cls, v):
        if len(v) < 6:
            raise ValueError('La contraseña debe tener al menos 6 caracteres')
        return v

class UsuarioResponse(BaseModel):
    id_usuario: int
    username: str
    correo: str

class PreguntaResponse(BaseModel):
    id_pregunta: int
    nom_pregunta: str

class RespuestaInput(BaseModel):
    id_pregunta: int
    respuesta_str: str

class CuestionarioInput(BaseModel):
    respuestas: List[RespuestaInput]

    @field_validator('respuestas')
    def respuestas_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Debe proporcionar al menos una respuesta')
        return v

class PrediccionInput(BaseModel):
    """
    Esquema para los datos de predicción de diabetes.
    Ajusta estos campos según las características que use tu modelo.
    """
    # Ejemplo de campos comunes para predicción de diabetes
    gender: str
    age: float
    hypertension: str
    heart_disease: str
    smoking_history: Optional[str] = 'No Info'
    bmi: float
    HbA1c_level: float
    blood_glucose_level: int
    
    @field_validator('blood_glucose_level')
    def glucose_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('El nivel de glucosa en sangre debe ser positivo')
        return v
    
    @field_validator('HbA1c_level')
    def HbA1c_level_must_be_positive(cls, v):
        if v <= 0.0:
            raise ValueError('El nivel de HbA1c debe ser positivo')
        return v
    
    @field_validator('bmi')
    def bmi_must_be_positive(cls, v):
        if v <= 0.0:
            raise ValueError('El BMI debe ser positivo')
        return v
    
    @field_validator('age')
    def age_must_be_positive(cls, v):
        if v <= 0.0:
            raise ValueError('La edad debe ser positiva')
        return v

class PrediccionResponse(BaseModel):
    prediccion: str
    probabilidad: Optional[float] = None
    id_cuestionario: Optional[int] = None

class CuestionarioResponse(BaseModel):
    id_cuestionario: int
    fecha: str
    hora: str
    id_usuario: int

class ResultadoResponse(BaseModel):
    id_resultado: int
    prediccion: str
    id_cuestionario: int

class LoginResponse(BaseModel):
    mensaje: str
    usuario: UsuarioResponse

class ErrorResponse(BaseModel):
    error: str
    detalle: Optional[str] = None