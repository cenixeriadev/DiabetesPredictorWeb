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
    ID_usuario: int
    username: str
    correo: str

class PreguntaResponse(BaseModel):
    ID_pregunta: int
    nom_pregunta: str

class RespuestaInput(BaseModel):
    ID_pregunta: int
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
    pregnancies: Optional[int] = 0
    glucose: float
    blood_pressure: float
    skin_thickness: Optional[float] = 0
    insulin: Optional[float] = 0
    bmi: float
    diabetes_pedigree_function: Optional[float] = 0
    age: int
    
    @field_validator('glucose')
    def glucose_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('El nivel de glucosa debe ser positivo')
        return v
    
    @field_validator('blood_pressure')
    def blood_pressure_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('La presión arterial debe ser positiva')
        return v
    
    @field_validator('bmi')
    def bmi_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('El BMI debe ser positivo')
        return v
    
    @field_validator('age')
    def age_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('La edad debe ser positiva')
        return v

class PrediccionResponse(BaseModel):
    prediccion: str
    probabilidad: Optional[float] = None
    ID_cuestionario: Optional[int] = None

class CuestionarioResponse(BaseModel):
    ID_cuestionario: int
    fecha: str
    hora: str
    ID_usuario: int

class ResultadoResponse(BaseModel):
    ID_resultado: int
    prediccion: str
    ID_cuestionario: int

class LoginResponse(BaseModel):
    mensaje: str
    usuario: UsuarioResponse

class ErrorResponse(BaseModel):
    error: str
    detalle: Optional[str] = None