import "../../styles/Pag_Cuestionario.css";
import React from "react";
import { Link } from "react-router-dom";

export default function resultado_moderado() {
    return (
    <div className="resultado-container">
        <div className="resultado-card">
        <h2 className="resultado-title">Riesgo Moderado</h2>
        <img src="/riesgo_moderado.jpeg" alt="Riesgo moderado" className="resultado-img" />
        <p className="resultado-text">
            Tu puntaje indica un <strong>riesgo moderado</strong> de diabetes tipo 2.
            Es recomendable visitar a un especialista para prevenir complicaciones a futuro.
        </p>
        <Link to="/" className="resultado-btn">Volver al inicio</Link>
        </div>
    </div>
    );
}
