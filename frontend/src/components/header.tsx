import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/header.css";

export default function Headerprincipal() {
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = localStorage.getItem('logueado') === 'true';

    return (
        
        <header>
            <div className="LogoContainer">
                <h2 className="Logo">4Z</h2>
                <h3 className="Titulo">
                    Modelo Predictivo Web para Estimar la Probabilidad de Desarrollo de Diabetes Tipo 2
                </h3>
            </div>
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
            >
                &#9776;
            </button>
            <div className={`MenuContainer ${menuOpen ? 'open' : ''}`}>
                <nav className="Menu">
                    <Link to="/Home" onClick={() => setMenuOpen(false)}>Inicio</Link>
                    <Link to="./Pag_Informacion" onClick={() => setMenuOpen(false)}>Información</Link>
                    <Link to="/Evaluation" onClick={() => setMenuOpen(false)}>Evaluacion</Link>
                </nav>
                <nav className="Login">
                    {isLoggedIn ? (
                        <Link to="/ProfileInformation" onClick={() => setMenuOpen(false)}>Usuario X</Link>
                    ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Login/Registro</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}