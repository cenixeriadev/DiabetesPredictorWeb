import "../styles/Pag_Evaluacion.css";
import { Link } from 'react-router-dom';

export default function Home(){
    return (
    <>
        <form className="formulario">
            <div className="campo">
                <label>Glucosa</label>
                <input type="number" placeholder="Nivel de glucosa en ayunas"/>
                <p>Ingrese su nivel de glucosa en sangre en ayunas (en mg/dL).</p>
            </div>

            <div className="campo">
                <label>Presión Arterial</label>
                <input type="number" placeholder="Presión arterial"/>
                <p>Ingrese su presión arterial (en mmHg).</p>
            </div>

            <div className="campo">
                <label>Nivel de insulina</label>
                <input type="number" placeholder="Insulina sérica"/>
                <p>Ingrese su nivel de insulina sérica en ayunas (en μU/mL).</p>
            </div>

            <div className="campo">
                <label>Edad</label>
                <input type="number" placeholder="Edad"/>
                <p>Ingrese su edad en años.</p>
            </div>

            <div className="campo">
                <label>Espesor de pliegue cutáneo</label>
                <input type="number" placeholder="Espesor en mm"/>
                <p>Ingrese el espesor del pliegue en el tríceps (en mm).</p>
            </div>

            <div className="campo">
                <label>Función de pedigrí de diabetes</label>
                <input type="number" placeholder="Pedigrí"/>
                <p>Estima su riesgo genético de desarrollar diabetes basado en antecedentes familiares.</p>
            </div>

            <div className="campo">
                <label>Número de Embarazos</label>
                <input type="number" placeholder="Número de embarazos"/>
                <p>Ingrese el número de embarazos que ha tenido (0 si es hombre o no ha tenido).</p>
            </div>

            <div className="campo">
                <label>Índice de Masa Corporal</label>
                <input type="number" placeholder="IMC"/>
                <p>Ingrese su Índice de Masa Corporal (BMI). Fórmula: Peso (kg) / Altura² (m).</p>
            </div>

            <button type="button">➜ Predecir</button>
            <div id="resultado" ></div>

            </form>
            <div className="btn_cuestionario">
                <Link to="/Pag_Cuestionario" className="btn_cuestionario_link">Cuestionario</Link>
            </div>
    </>   
    );
};
