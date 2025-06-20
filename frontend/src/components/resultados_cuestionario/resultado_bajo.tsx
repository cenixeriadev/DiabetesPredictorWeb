import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Pag_Cuestionario.css";

export default function resultado_bajo() {
    return (
    <div className="resultado-container">
        <div className="resultado-card">
        <h2 className="resultado-title">Riesgo Bajo</h2>
        <img src="/riesgo_bajo.jpeg" alt="Riesgo bajo" className="resultado-img" />
        <p className="resultado-text">
            ¡Felicitaciones! Tus hábitos indican un <strong>riesgo bajo</strong> de desarrollar diabetes tipo 2.
            Sigue manteniendo un estilo de vida saludable.
        </p>
        <Link to="/" className="resultado-btn">Volver al inicio</Link>
        </div>
    </div>
    );
}
