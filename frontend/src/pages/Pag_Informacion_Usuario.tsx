import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Pag_Informacion_Usuario.css";
import UserProfileLayout from "../components/UserProfileLayout";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface UserInfo {
  username: string;
  correo: string;
}

export default function Pag_Informacion_Usuario() {
    const { user, checkAuthStatus } = useAuth();
    const [formData, setFormData] = useState<UserInfo>({
        username: '',
        correo: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    useEffect(() => {
        fetchUserInfo();
    }, []);
    
    // Actualizar formData cuando el usuario en el contexto cambia
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                correo: user.correo || ''
            });
        }
    }, [user]);
    
    const fetchUserInfo = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, {
                withCredentials: true
            });
            
            if (response.status === 200 && response.data.usuario) {
                setFormData({
                    username: response.data.usuario.username || '',
                    correo: response.data.usuario.correo || ''
                });
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            setError('No se pudo cargar la información del usuario. Por favor, intenta de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await axios.patch(`${API_BASE_URL}/api/v1/auth/`, {
                username: formData.username,
                correo: formData.correo
            }, {
                withCredentials: true
            });
            
            if (response.status === 200) {
                setSuccess('Información actualizada correctamente');
                setIsEditing(false);
                // Actualizar el usuario en el contexto de autenticación
                await checkAuthStatus();
            }
        } catch (error) {
            console.error('Error al actualizar información del usuario:', error);
            setError('No se pudo actualizar la información. Por favor, intenta de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
    <UserProfileLayout 
        activePage="personal"
        title="Información del perfil"
        subtitle="Aquí puedes ver y actualizar la información de tu perfil"
    >
        {isLoading ? (
            <div className="profileinfo-loading">
                <div className="profileinfo-spinner"></div>
                <p>Cargando información del usuario...</p>
            </div>
        ) : error ? (
            <div className="profileinfo-error">
                <p>{error}</p>
                <button 
                    onClick={fetchUserInfo} 
                    className="profileinfo-retry-button"
                >
                    Reintentar
                </button>
            </div>
        ) : (
            <>
                <div className="profileinfo-profile-container">
                    <div className="profileinfo-profile-picture">
                        <div className="profileinfo-avatar-icon">
                            {formData.username?.charAt(0).toUpperCase() || '○'}
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="profileinfo-update-button"
                    >
                        {isEditing ? 'Cancelar' : 'Editar'}
                    </button>
                </div>
                
                {success && (
                    <div className="profileinfo-success">
                        <p>{success}</p>
                    </div>
                )}
                
                <form className="profileinfo-form" onSubmit={handleSubmit}>
                    <div className="profileinfo-form-group">
                        <div className="profileinfo-input-container">
                            <input 
                                type="text" 
                                name="username"
                                placeholder="Nombre de usuario" 
                                value={formData.username}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                            <span className="profileinfo-form-icon">👤</span>
                        </div>
                    </div>
                    <div className="profileinfo-form-group">
                        <div className="profileinfo-input-container">
                            <input 
                                type="email" 
                                name="correo"
                                placeholder="Correo electrónico" 
                                value={formData.correo}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                            <span className="profileinfo-form-icon">✉️</span>
                        </div>
                    </div>
                    
                    {isEditing && (
                        <div style={{ textAlign: "right" }}>
                            <button 
                                type="submit" 
                                className="profileinfo-submit-button"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Actualizando...' : 'Guardar cambios'}
                            </button>
                        </div>
                    )}
                </form>
            </>
        )}
    </UserProfileLayout>
    );
}