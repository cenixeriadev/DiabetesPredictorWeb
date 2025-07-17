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
class UsuarioActualizar(BaseModel):
    username: Optional[str] = None
    correo: Optional[EmailStr] = None
    contrasena: Optional[str] = None

    @field_validator('username')
    def username_must_not_be_empty(cls, v):
        if v is not None and not v.strip():
            raise ValueError('El username no puede estar vacío')
        return v.strip() if v else v

    @field_validator('contrasena')
    def password_must_be_strong(cls, v):
        if v is not None and len(v) < 6:
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
    def glucose_must_be_reasonable(cls, v):
        if v <= 0:
            raise ValueError('El nivel de glucosa en sangre debe ser positivo')
        if v > 1000:  # Valores superiores a 1000 mg/dL son extremadamente raros
            raise ValueError('El nivel de glucosa en sangre es demasiado alto (máximo 1000 mg/dL)')
        return v
    
    @field_validator('HbA1c_level')
    def HbA1c_level_must_be_reasonable(cls, v):
        if v <= 0.0:
            raise ValueError('El nivel de HbA1c debe ser positivo')
        if v > 20.0:  # Valores superiores a 20% son extremadamente altos
            raise ValueError('El nivel de HbA1c es demasiado alto (máximo 20%)')
        return v
    
    @field_validator('bmi')
    def bmi_must_be_reasonable(cls, v):
        if v <= 0.0:
            raise ValueError('El BMI debe ser positivo')
        if v < 10.0:  # BMI por debajo de 10 es incompatible con la vida
            raise ValueError('El BMI es demasiado bajo (mínimo 10)')
        if v > 70.0:  # BMI por encima de 70 es extremadamente raro
            raise ValueError('El BMI es demasiado alto (máximo 70)')
        return v
    
    @field_validator('age')
    def age_must_be_reasonable(cls, v):
        if v <= 0.0:
            raise ValueError('La edad debe ser positiva')
        if v > 120.0:  # Edad máxima razonable
            raise ValueError('La edad es demasiado alta (máximo 120 años)')
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