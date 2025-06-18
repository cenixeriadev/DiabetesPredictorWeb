import "../styles/home.css";
import imagen1_diabetes_home from "../assets/imagenes/imagen1_diabetes_home.jpg";
import img2_diabetes_contenedor_2_home from "../assets/imagenes/img2_diabetes_contenedor_2_home.jpg";
import img3_comparacion_diabetes_contenedor_2_home from "../assets/imagenes/img3_comparacion_diabetes_contenedor_2_home.jpg";
import img4_vida_sana_contenedor_3_home from "../assets/imagenes/img4_vida_sana_contenedor_3_home.jpg";
import img5_grupito_4z_contenedor_4_home from "../assets/imagenes/img5_grupito_4z_contenedor_4_home.jpg";
import { Link } from 'react-router-dom';

export default function Home(){
    return (
    <>
        <section className="contenedor_inicial_home">
            <img className="imagen1_diabetes_home" src={imagen1_diabetes_home} alt="Prueba de sangre para medir glucosa" title="medicion de glucosa"/>
            <div className="contenido_texto1_home">
                <h2 className="subtitulo1">Conocer la diabetes es el primer paso para controlarlo</h2>
                <p className="parrafo1">Entender la diabetes no solo es informarse, es tomar el control de tu salud, prevenir complicaciones y vivir con responsabilidad y esperanza.</p>
            </div>
        </section>

        <section className="contenedor_segundo_home">
            <div className="imagenes_contenedor_2_home">
                <img className="img2_diabetes_contenedor_2_home" src={img2_diabetes_contenedor_2_home} alt="Prueba de sangre para medir glucosa" title="medicion de glucosa"/>
                <img className="img3_comparacion_diabetes_contenedor_2_home" src={img3_comparacion_diabetes_contenedor_2_home} alt="comparar sangre" title="comparacion de glucosa"/>
            </div>
            <div className="contenido_texto2_home">
                <h2 className="Subtitulo2">¿Qué es diabetes tipo 2?</h2>
                <p className="Parrafo2">La diabetes tipo 2 es una enfermedad crónica que afecta la manera en que el cuerpo metaboliza el azúcar (glucosa), una fuente importante de energía. A diferencia de la diabetes tipo 1, donde el cuerpo no produce insulina, en la tipo 2 el cuerpo no la utiliza adecuadamente (resistencia a la insulina) o no produce suficiente. Esta condición puede desarrollarse lentamente y durante años no presentar síntomas evidentes, lo que hace fundamental su detección temprana para evitar complicaciones graves como problemas cardíacos, renales, oculares y neurológicos.</p>
            </div>
        </section> 
            
        <section className="contenedor_tercero_home">
            <p className="parrafo3">
                <span className="destacado">Nuestro objetivo</span> es ofrecer una herramienta preventiva e interactiva que ayude a las personas a conocer su riesgo de desarrollar diabetes tipo 2, promoviendo la detección temprana y hábitos de vida saludables.
            </p>
            <img className="img4_vida_sana_contenedor_3_home" src={img4_vida_sana_contenedor_3_home} alt="Vida sana" title="vida sana"/> 
        </section>

        <section className="contenedor_cuarto_home">
            <img className="img5_grupito_4z_contenedor_4_home" src={img5_grupito_4z_contenedor_4_home} alt="Grupo de estudiantes" title="grupo de estudiantes"/>
            <div className="contenido_texto3_home">
                <h2 className="subtitulo3">¿Quienes somos?</h2>
                <p className="parrafo4">Somos un grupo de estudiantes comprometidos con la salud pública y la tecnología, que hemos desarrollado esta plataforma como parte de un proyecto académico. Nuestra motivación nace del deseo de aplicar nuestros conocimientos en informática para generar un impacto positivo en la sociedad.</p>
            </div>
        </section>

        <section className="contenedor_quinto_home">
            <h2 className="subtitulo4">¿Qué ofrecemos y cómo funciona la predicción?</h2>
            <p className="parrafo5">Ofrecemos una herramienta digital que analiza tus datos personales y hábitos de vida para estimar el nivel de riesgo de desarrollar diabetes tipo 2. El sistema funciona a través de un cuestionario breve, en el que se ingresan datos como: </p>
            <ul className="datos_encuesta">
                <li>Edad</li>
                <li>Peso y altura (para calcular el IMC)</li>
                <li>Actividad física</li>
                <li>Presión arterial</li>
                <li>Historial familiar</li>
                <li>Niveles de glucosa</li>
            </ul>
            <p className="parrafo6">Con base en estos datos, el sistema utiliza un modelo de predicción para evaluar el riesgo de desarrollar diabetes tipo 2, proporcionando recomendaciones personalizadas para mejorar la salud y prevenir la enfermedad.</p>
            
        </section>

        <section className="contenedor_sexto_home">
            <h2 className="Subtitulo5">Beneficios de usar esta herramienta</h2>
            <ul className="Beneficios">
                <li>Detección temprana del riesgo de diabetes tipo 2</li>
                <li>Recomendaciones personalizadas según tu perfil</li>
                <li>Educación para la salud: aprenderas cómo mejorar tus habitos</li>
                <li>Privacidad garantizada</li>
            </ul>

        </section>

        <section className="contenedor_septimo_home">
            <nav className="evaluacion_home">   
                <Link to="/Evaluation">Inicia tu evaluación</Link>
            </nav>
        </section>


    </>   
    );
};
