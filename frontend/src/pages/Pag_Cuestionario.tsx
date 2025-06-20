import { useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/Pag_Cuestionario.css";
import preguntas from '../components/preguntas';

interface Pregunta {
    texto: string
    invertida: boolean
}

const imagenes = [
    'totalmente desacuerdo.png',
    'desacuerdo.png',
    'neutral.png',
    'de acuerdo.png',
    'totalmente de acuerdo.png'
]

const etiquetas = [
    'Totalmente en desacuerdo',
    'En desacuerdo',
    'Neutral',
    'De acuerdo',
    'Totalmente de acuerdo'
]

function App() {
    const [index, setIndex] = useState<number>(0)
    const [respuestas, setRespuestas] = useState<number[]>(Array((preguntas as Pregunta[]).length).fill(2))
    const [error, setError] = useState<boolean>(false)
    const [fade, setFade] = useState<string>('fade-in')

    // Esta función actualiza la respuesta seleccionada
    const actualizarRespuesta = (valor: string) => {
        const nuevas = [...respuestas]
        nuevas[index] = parseInt(valor)
        setRespuestas(nuevas)
        setError(false)
    }

    const siguiente = () => {
        if (respuestas[index] === null || respuestas[index] === undefined) {
            setError(true)
            return
        }

        setFade('fade-out')
        setTimeout(() => {
            if (index < (preguntas as Pregunta[]).length - 1) {
                setIndex(index + 1)
                setFade('fade-in')
            } else {
                const puntaje = respuestas.reduce((total, r, i) => {
                    const invertida = (preguntas as Pregunta[])[i].invertida
                    return total + (invertida ? 4 - r : r)
                }, 0)

                let path = ''
                if (puntaje <= 6) path = '/resultado/bajo'
                else if (puntaje <= 12) path = '/resultado/ligero'
                else if (puntaje <= 18) path = '/resultado/moderado'
                else if (puntaje <= 24) path = '/resultado/alto'
                else path = '/resultado/muy-alto'

                window.location.href = path
            }
        }, 300)
    }

    const anterior = () => {
        setFade('fade-out')
        setTimeout(() => {
            if (index > 0) {
                setIndex(index - 1)
                setFade('fade-in')
            }
        }, 300)
    }

    return (
        <div className="container2">
            <main className={`question-container ${fade}`}>
                <h2>PREGUNTA {index + 1} de {(preguntas as Pregunta[]).length}</h2>
                <p>{(preguntas as Pregunta[])[index].texto}</p>

                <div className="slider-container">
                    <div className="face-row">
                        {imagenes.map((img, i) => (
                            <div className="face-column" key={i}>
                                <img src={`/${img}`} alt={etiquetas[i]} />
                                <span>{etiquetas[i]}</span>
                            </div>
                        ))}
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="4"
                        value={respuestas[index] ?? ''}
                        onChange={(e) => actualizarRespuesta(e.target.value)}
                    />
                    {error && <p id="error">Selecciona una alternativa por favor :)</p>}
                </div>
            </main>

            <div className="botones-navegacion">
                {index > 0 && <button onClick={anterior}>← Anterior</button>}
                <button onClick={siguiente}>
                    {index < (preguntas as Pregunta[]).length - 1 ? 'Siguiente →' : 'Ver resultados →'}
                </button>
            </div>
        </div>
    )
}

export default App