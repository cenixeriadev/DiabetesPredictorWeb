import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ListaEvaluaciones.css';

export default function ListaEvaluaciones() {
    return (
    <div className="profileinfo-container">
        <div className="profileinfo-sidebar">
        <div className="profileinfo-menu-item">Configuraciones</div>
        <div className="profileinfo-menu-item">
            <Link to="/Pag_Informacion_Usuario" className="profileinfo-link">Personal</Link>
        </div>
        <div className="profileinfo-menu-item active">Lista de evaluaciones</div>
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
            onClick={() => localStorage.removeItem('logueado')}
            style={{ color: '#e53e3e', display: 'flex', alignItems: 'center' }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Cerrar sesión
            </Link>
        </div>
        </div>
        <div className="profileinfo-main-content">
        <h1>Lista de evaluaciones</h1>
        <p>A continuación la lista de evaluaciones tomadas.</p>

        {[1, 2, 3, 4].map((evaluacion) => (
            <div className="profileinfo-evaluation-block" key={evaluacion}>
            <h3>Evaluación {evaluacion}</h3>
            <div className="profileinfo-form-group">
                <label>Fecha:</label>
                <input type="text" placeholder="dd/mm/yy" />
            </div>
            <div className="profileinfo-form-group">
                <label>Hora:</label>
                <input type="text" placeholder="hh:ss" />
            </div>
            <div className="profileinfo-form-group">
                <label>Resultado:</label>
                <input type="text" placeholder="Nivel de riesgo" />
            </div>
            </div>
        ))}

        <div className="profileinfo-buttons">
            <Link to="/Pag_Informacion_Usuario" className="profileinfo-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Regresar
            </Link>
            <Link to="#" className="profileinfo-button">
            Siguiente
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', marginRight: '0' }}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            </Link>
        </div>
        </div>
    </div>
    );
}