import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Pag_Cuestionario.css";

export default function resultado_alto() {
    return (
    <div className="resultado-container">
        <div className="resultado-card">
        <h2 className="resultado-title">Riesgo Alto</h2>
        <img src="/riesgo_alto.jpeg" alt="Riesgo alto" className="resultado-img" />
            <p className="resultado-text">
            Tu puntaje indica un <strong>riesgo alto</strong> de desarrollar diabetes tipo 2.
            Es muy importante que acudas a una evaluación médica y tomes medidas inmediatas
            para mejorar tus hábitos de vida.
            </p>
        <Link to="/" className="resultado-btn">Volver al inicio</Link>
        </div>
    </div>
    );
}
