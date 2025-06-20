export interface Pregunta {
    texto: string
    invertida: boolean
}

const preguntas: Pregunta[] = [
    { texto: "¿Consumes frutas y verduras diariamente?", invertida: true },
    { texto: "¿Consumes alimentos o bebidas con alto contenido de azúcar (como gaseosas, pasteles, dulces)?", invertida: false },
    { texto: "¿Consumes alimentos ultraprocesados (como snacks, embutidos, comidas rápidas) con frecuencia?", invertida: false },
    { texto: "¿Realizas actividad física (como caminar, correr o ir al gimnasio) al menos 3 veces por semana?", invertida: true },
    { texto: "¿Duermes al menos 7 horas por noche?", invertida: true },
    { texto: "¿Vas al médico regularmente para controles de salud?", invertida: true },
    { texto: "¿Sientes que tienes sobrepeso u obesidad actualmente?", invertida: false },
    { texto: "¿Tienes antecedentes familiares de diabetes tipo 2 (padres, hermanos/as)?", invertida: false },
]

export default preguntas;