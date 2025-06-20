export interface Pregunta {
    texto: string;
    invertida: boolean;
}

export const preguntas: Pregunta[] = [
    { texto: "¿Consumes frutas y verduras diariamente?", invertida: true },
    { texto: "¿Consumes alimentos o bebidas con alto contenido de azúcar?", invertida: false },
    { texto: "¿Consumes alimentos ultraprocesados?", invertida: false },
    { texto: "¿Realizas actividad física al menos 3 veces por semana?", invertida: true },
    { texto: "¿Duermes al menos 7 horas por noche?", invertida: true },
    { texto: "¿Vas al médico regularmente?", invertida: true },
    { texto: "¿Sientes que tienes sobrepeso u obesidad?", invertida: false },
    { texto: "¿Tienes antecedentes familiares de diabetes tipo 2?", invertida: false }
];

export function calcularResultado(respuestas: number[]): string {
    const total = respuestas.reduce((acc, respuesta, i) => {
    const invertida = preguntas[i].invertida;
    return acc + (invertida ? 4 - respuesta : respuesta);
    }, 0);

    if (total <= 6) return "bajo";
    else if (total <= 12) return "ligero";
    else if (total <= 18) return "moderado";
    else if (total <= 24) return "alto";
    else return "muy_alto";
}