import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pag_Informacion_Usuario.css";

export default function Pag_Informacion_Usuario() {
    return (
    <div className="profileinfo-container">
        <div className="profileinfo-sidebar">
        <div className="profileinfo-menu-item">Configuraciones</div>
        <div className="profileinfo-menu-item active">Personal</div>
        <div className="profileinfo-menu-item">
            <Link to="/ListaEvaluaciones" className="profileinfo-link">Lista de evaluaciones</Link>
        </div>
        <div className="profileinfo-separator"></div>
        <div className="profileinfo-menu-item">
            <Link to="/ResetPassword" className="profileinfo-link">Cambiar contraseña</Link>
        </div>
        <div className="profileinfo-menu-item">
            <Link to="/DeleteAccount" className="profileinfo-link">Eliminar cuenta</Link>
        </div>
        <div className="profileinfo-separator"></div>
        <div className="profileinfo-menu-item">
            <Link
            to="/Login"
            className="profileinfo-link logout"
            onClick={() => localStorage.removeItem("logueado")}
            style={{ color: "#e53e3e", display: "flex", alignItems: "center" }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Cerrar sesión
            </Link>
        </div>
        </div>
        <div className="profileinfo-main-content">
        <h1>Información del perfil</h1>
        <p>Aquí puedes ver la información de tu perfil</p>
        <div className="profileinfo-profile-container">
            <div className="profileinfo-profile-picture">
            <div className="profileinfo-avatar-icon">○</div>
            </div>
            <a href="#" className="profileinfo-update-button">Actualizar</a>
        </div>
        <div className="profileinfo-form">
            <div className="profileinfo-form-group">
            <div className="profileinfo-input-container">
                <input type="text" placeholder="Full name" />
                <span className="profileinfo-form-icon">👤</span>
            </div>
            </div>
            <div className="profileinfo-form-group">
            <div className="profileinfo-input-container">
                <input type="email" placeholder="Email address" />
                <span className="profileinfo-form-icon">✉️</span>
            </div>
            </div>
            <div className="profileinfo-form-group">
            <div className="profileinfo-input-container">
                <input type="password" placeholder="Password" />
                <span className="profileinfo-form-icon">🔒</span>
            </div>
            </div>
            <div style={{ textAlign: "right" }}>
            <button className="profileinfo-submit-button">Actualizar</button>
            </div>
        </div>
        </div>
    </div>
    );
}