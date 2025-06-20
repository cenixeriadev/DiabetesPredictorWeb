import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Pag_Cuestionario.css";

export default function resultado_ligero() {
    return (
    <div className="resultado-container">
        <div className="resultado-card">
        <h2 className="resultado-title">Riesgo Ligero</h2>
        <img src="/riesgo_ligero.jpeg" alt="Riesgo ligero" className="resultado-img" />
        <p className="resultado-text">
            Tienes un <strong>riesgo ligero</strong> de desarrollar diabetes tipo 2.
            Considera realizar ajustes leves en tu alimentación y nivel de actividad física.
        </p>
        <Link to="/" className="resultado-btn">Volver al inicio</Link>
        </div>
    </div>
    );
}
