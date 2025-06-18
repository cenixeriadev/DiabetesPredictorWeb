import "../styles/Pag_Informacion.css";
import { Link } from 'react-router-dom';
import imagen1 from "../assets/imagenes_info/imagen1.jpg";
import imagen2 from "../assets/imagenes_info/imagen2.jpg";
import imagen3 from "../assets/imagenes_info/imagen3.jpg";
import imagen4 from "../assets/imagenes_info/imagen4.jpg";
import imagen5 from "../assets/imagenes_info/imagen5.jpg";
import imagen6 from "../assets/imagenes_info/imagen6.jpg";
import imagen7 from "../assets/imagenes_info/imagen7.jpg";
import imagen8 from "../assets/imagenes_info/imagen8.jpg";
import imagen9 from "../assets/imagenes_info/imagen9.jpg";
import imagen10 from "../assets/imagenes_info/imagen10.jpg";
import imagen11 from "../assets/imagenes_info/imagen11.png";
import imagen12 from "../assets/imagenes_info/imagen12.png";


function Pag_Informacion() {
    return (
    <>
    <section className="hero-section">
        <div className="hero-content">
            <div className="hero-text">
                <h1 className="hero-title">¿Qué es la diabetes?</h1>
                <p className="hero-description">
                    La diabetes es una enfermedad crónica que aparece cuando el páncreas no produce suficiente insulina 
                    o cuando el organismo no utiliza eficazmente la insulina que produce. Conoce más sobre esta condición 
                    y cómo manejarla adecuadamente.
                </p>
            </div>
            <div className="hero-image">
                <img src={imagen1} alt="Imagen principal diabetes" className="hero-img" />
            </div>
        </div>
    </section>

    {/* <!-- Symptoms Section --> */}
    <section className="symptoms-section">
        <div className="container">
            <h2 className="section-title">Signos y síntomas</h2>
            <div className="content-row">
                <div className="text-content">
                    <p>Los síntomas de la diabetes pueden desarrollarse gradualmente y a menudo pasan desapercibidos. 
                    Es importante conocer las señales de alerta para buscar atención médica oportuna.</p>
                    <ul className="symptoms-list">
                        <li>Sed excesiva</li>
                        <li>Micción frecuente</li>
                        <li>Fatiga extrema</li>
                        <li>Visión borrosa</li>
                    </ul>
                </div>
                <div className="image-content">
                    
                    <img src={imagen3} alt="Manos" className="image-placeholder"/>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Types Section --> */}
    <section className="types-section">
        <div className="container">
            <div className="types-grid">
                <div className="type-card">
                    <img src={imagen5} alt="Diabetes Tipo 1" className="image-placeholder"/>
                    <div className="card-content">
                        <h3>Diabetes Tipo 1</h3>
                        <p>Condición autoinmune donde el cuerpo no produce insulina. Generalmente se desarrolla en la infancia o adolescencia.</p>
                    </div>
                </div>
                <div className="type-card">
                    <img src={imagen6} alt="Diabetes Tipo 2" className="image-placeholder"/>
                    <div className="card-content">
                        <h3>Diabetes Tipo 2</h3>
                        <p>El cuerpo no usa la insulina eficientemente. Es la forma más común y está relacionada con el estilo de vida.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Management Section --> */}
    <section className="management-section">
        <div className="container">
            <h2 className="section-title">Manejo de la diabetes</h2>
            <div className="management-grid">
                <div className="management-item">
                    
                    <img src={imagen7} alt="Alimentación" className="image-placeholder"/>
                    <h4>Alimentación saludable</h4>
                    <p>Una dieta balanceada es fundamental para controlar los niveles de azúcar en sangre.</p>
                </div>
                <div className="management-item">
                    
                    <img src={imagen8} alt="Ejercicio" className="image-placeholder"/>
                    <h4>Actividad física</h4>
                    <p>El ejercicio regular ayuda a mejorar el control glucémico y la salud general.</p>
                </div>
                <div className="management-item">
                    
                    <img src={imagen9} alt="Monitoreo" className="image-placeholder"/>
                    <h4>Monitoreo regular</h4>
                    <p>Controlar regularmente los niveles de glucosa es esencial para un buen manejo.</p>
                </div>
            </div>
        </div>
    </section>

    {/* Monitoring Tools Section */}
    <section className="tools-section">
        <div className="container">
            <h2 className="section-title">Dispositivos y tipos de monitoreo</h2>
            <div className="tools-content">
                <div className="tool-row">
                    <img src={imagen10} alt="Glucometro" className="image-placeholder"/>
                    <div className="tool-info">
                        <h3>Glucómetro tradicional</h3>
                        <p>Dispositivo portátil que mide la glucosa en sangre mediante una pequeña muestra de sangre.</p>
                    </div>
                </div>
                <div className="tool-row reverse">
                    
                    <img src={imagen11} alt="Monitor continuo de glucosa" className="image-placeholder"/>
                    <div className="tool-info">
                        <h3>Monitor continuo de glucosa</h3>
                        <p>Tecnología avanzada que proporciona lecturas continuas de glucosa las 24 horas del día.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Medical Care Section --> */}
    <section className="medical-section">
        <div className="container">
            <div className="medical-content">
                <div className="medical-text">
                    <h2>Atención médica especializada</h2>
                    <p>El seguimiento médico regular es fundamental para prevenir complicaciones y mantener una buena calidad de vida. 
                    Consulta con profesionales de la salud especializados en diabetes.</p>
                    <div className="medical-points">
                        <div className="point">
                            <strong>Endocrinólogo:</strong> Especialista en diabetes y metabolismo
                        </div>
                        <div className="point">
                            <strong>Nutricionista:</strong> Planificación de dieta personalizada
                        </div>
                        <div className="point">
                            <strong>Educador en diabetes:</strong> Enseñanza del manejo diario
                        </div>
                    </div>
                </div>
                <div className="medical-image">
                    
                    <img src={imagen12} alt="Atención médica" className="image-placeholder"/>
                </div>
            </div>
        </div>
    </section>
    </>
    )
}

export default Pag_Informacion