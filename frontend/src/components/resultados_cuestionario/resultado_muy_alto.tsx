import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Pag_Cuestionario.css";

export default function resultado_muy_alto() {
    return (
    <div className="resultado-container">
        <div className="resultado-card">
        <h2 className="resultado-title">Riesgo Muy Alto</h2>
        <img src="/riesgo_muy_alto.jpeg" alt="Riesgo muy alto" className="resultado-img" />
        <p className="resultado-text">
            Tu puntaje refleja un <strong>riesgo muy alto</strong> de padecer diabetes tipo 2.
            Busca atención médica de inmediato y comienza un cambio profundo en tus hábitos
            de salud y estilo de vida.
        </p>
        <Link to="/" className="resultado-btn">Volver al inicio</Link>
        </div>
    </div>
    );
}
