from flask import session
from database.models import db, Usuario
from schemas.schemas import UsuarioLogin, UsuarioRegistro , UsuarioActualizar
from typing import Optional, Dict, Any

class AuthService:
    
    @staticmethod
    def login_user(login_data: UsuarioLogin) -> Dict[str, Any]:
        """
        Autentica un usuario y crea una sesión.
        
        Args:
            login_data: Datos de login del usuario
            
        Returns:
            Diccionario con el resultado del login
        """
        try:
            # Buscar usuario por username
            usuario = Usuario.query.filter_by(username=login_data.username).first()
            
            if not usuario:
                return {
                    'success': False,
                    'message': 'Usuario no encontrado'
                }
            
            # Verificar contraseña
            if not usuario.check_password(login_data.contrasena):
                return {
                    'success': False,
                    'message': 'Contraseña incorrecta'
                }
            
            # Crear sesión
            session['user_id'] = usuario.id_usuario
            session['username'] = usuario.username
            
            return {
                'success': True,
                'message': 'Login exitoso',
                'usuario': usuario.to_dict()
            }
            
        except Exception as e:
            return {
                'success': False,
                'message': f'Error en el login: {str(e)}'
            }
    
    @staticmethod
    def register_user(registro_data: UsuarioRegistro) -> Dict[str, Any]:
        """
        Registra un nuevo usuario.
        
        Args:
            registro_data: Datos de registro del usuario
            
        Returns:
            Diccionario con el resultado del registro
        """
        try:
            # Verificar si el username ya existe
            existing_user = Usuario.query.filter_by(username=registro_data.username).first()
            if existing_user:
                return {
                    'success': False,
                    'message': 'El username ya existe'
                }
            
            # Verificar si el correo ya existe
            existing_email = Usuario.query.filter_by(correo=registro_data.correo).first()
            if existing_email:
                return {
                    'success': False,
                    'message': 'El correo ya está registrado'
                }
            
            # Crear nuevo usuario
            nuevo_usuario = Usuario(
                username=registro_data.username,
                correo=registro_data.correo,
                contrasena=registro_data.contrasena
            )
            
            db.session.add(nuevo_usuario)
            db.session.commit()
            
            return {
                'success': True,
                'message': 'Usuario registrado exitosamente',
                'usuario': nuevo_usuario.to_dict()
            }
            
        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'message': f'Error en el registro: {str(e)}'
            }
    
    @staticmethod
    def logout_user() -> Dict[str, Any]:
        """
        Cierra la sesión del usuario.
        
        Returns:
            Diccionario con el resultado del logout
        """
        try:
            session.clear()
            return {
                'success': True,
                'message': 'Logout exitoso'
            }
        except Exception as e:
            return {
                'success': False,
                'message': f'Error en el logout: {str(e)}'
            }
    
    @staticmethod
    def get_current_user() -> Optional[Usuario]:
        """
        Obtiene el usuario actual de la sesión.
        
        Returns:
            Usuario actual o None si no hay sesión activa
        """
        try:
            user_id = session.get('user_id')
            if user_id:
                return Usuario.query.get(user_id)
            return None
        except Exception:
            return None
    
    @staticmethod
    def is_authenticated() -> bool:
        """
        Verifica si hay un usuario autenticado.
        
        Returns:
            True si hay usuario autenticado, False caso contrario
        """
        return 'user_id' in session and session.get('user_id') is not None
    
    @staticmethod
    def require_auth() -> Optional[Dict[str, Any]]:
        """
        Función helper para requerir autenticación.
        
        Returns:
            None si está autenticado, dict con error si no
        """
        if not AuthService.is_authenticated():
            return {
                'success': False,
                'message': 'Acceso no autorizado. Inicie sesión primero.'
            }
        return None
    @staticmethod
    def delete_user(user_id: int) -> Dict[str, Any]:
        """
        Elimina un usuario por su ID.

        Args:
            user_id: ID del usuario a eliminar

        Returns:
            Diccionario con el resultado de la eliminación
        """
        try:
            usuario = Usuario.query.get(user_id)
            if not usuario:
                return {
                    'success': False,
                    'message': 'Usuario no encontrado'
                }

            db.session.delete(usuario)
            db.session.commit()

            return {
                'success': True,
                'message': 'Usuario eliminado exitosamente'
            }
        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'message': f'Error al eliminar el usuario: {str(e)}'
            }

    @staticmethod
    def update_user(user_id: int, data: UsuarioActualizar) -> Dict[str, Any]:
        """
        Actualiza la información de un usuario.

        Args:
            user_id: ID del usuario a actualizar
            data: Diccionario con los campos a actualizar

        Returns:
            Diccionario con el resultado de la actualización
        """
        try:
            usuario = Usuario.query.get(user_id)
            if not usuario:
                return {
                    'success': False,
                    'message': 'Usuario no encontrado'
                }
            if data.correo:
                usuario.correo = data.correo
            if data.username:
                usuario.username = data.username
            if data.contrasena:
                usuario.set_password(data.contrasena)
            db.session.commit()

            return {
                'success': True,
                'message': 'Usuario actualizado exitosamente',
                'usuario': usuario.to_dict()
            }
        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'message': f'Error al actualizar el usuario: {str(e)}'
            }