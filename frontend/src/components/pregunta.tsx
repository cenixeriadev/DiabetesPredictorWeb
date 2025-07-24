import React from "react";
import preguntas from "../components/preguntas"; // Asegúrate de importar desde el archivo TypeScript

interface PreguntaProps {
    indice: number;
    valor: number | null;
    setValor: (valor: number) => void;
}

export default function Pregunta({ indice, valor, setValor }: PreguntaProps) {
    const pregunta = preguntas[indice];

    return (
    <div className="pregunta">
        <h2>QUESTION {indice + 1} of {preguntas.length}</h2>
        <p>{pregunta.texto}</p>
        <div className="face-row">
        {[0, 1, 2, 3, 4].map(val => (
            <div className="face-column" key={val}>
            <img src={`/faces/${val}.png`} alt={`valor ${val}`} />
            <span>
                {["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"][val]}
            </span>
            </div>
        ))}
        </div>
        <input
        type="range"
        min="0"
        max="4"
        value={valor ?? ""}
        onChange={(e) => setValor(parseInt(e.target.value))}
        />
        {valor === null && <p style={{ color: "red" }}>Please select an option :)</p>}
    </div>
    );
}