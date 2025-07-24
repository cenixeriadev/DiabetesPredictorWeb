import "../styles/home.css";
import imagen1_diabetes_home from "../assets/imagenes/imagen1_diabetes_home.jpg";
import img2_diabetes_contenedor_2_home from "../assets/imagenes/img2_diabetes_contenedor_2_home.jpg";
import img3_comparacion_diabetes_contenedor_2_home from "../assets/imagenes/img3_comparacion_diabetes_contenedor_2_home.jpg";
import img4_vida_sana_contenedor_3_home from "../assets/imagenes/img4_vida_sana_contenedor_3_home.jpg";
import img5_grupito_4z_contenedor_4_home from "../assets/imagenes/img5_grupito_4z_contenedor_4_home.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="contenedor_inicial_home">
        <img
          className="imagen1_diabetes_home"
          src={imagen1_diabetes_home}
          alt="Prueba de sangre para medir glucosa"
          title="medicion de glucosa"
        />
        <div className="contenido_texto1_home">
          <h2 className="subtitulo1">
            Understanding diabetes is the first step to managing it.
          </h2>
          <p className="parrafo1">
            Understanding diabetes is not just about being informed, it is about taking control of
            your health, preventing complications, and living responsibly and
            hopefully.
          </p>
        </div>
      </section>

      <section className="contenedor_segundo_home">
        <div className="imagenes_contenedor_2_home">
          <img
            className="img2_diabetes_contenedor_2_home"
            src={img2_diabetes_contenedor_2_home}
            alt="Prueba de sangre para medir glucosa"
            title="medicion de glucosa"
          />
          <img
            className="img3_comparacion_diabetes_contenedor_2_home"
            src={img3_comparacion_diabetes_contenedor_2_home}
            alt="comparar sangre"
            title="comparacion de glucosa"
          />
        </div>
        <div className="contenido_texto2_home">
          <h2 className="Subtitulo2">¿Qué es diabetes tipo 2?</h2>
          <p className="Parrafo2">
            Type 2 diabetes is a long-term disease that affects how the body processes sugar (glucose), 
            which is an important source of energy. Unlike type 1 diabetes, where the body fails to produce insulin,
            in type 2 diabetes, the body either does not use insulin properly or does not make enough of it. This
            condition can develop gradually and may not show clear symptoms for years. Early detection is crucial to prevent serious complications such as heart, kidney, eye, and nerve issues.
          </p>
        </div>
      </section>

      <section className="contenedor_tercero_home">
        <p className="parrafo3">
          <span className="destacado">Nuestro objetivo</span>
          <br></br>
          To offer a preventive and interactive tool that helps people understand their risk of developing type 2 diabetes,
          promoting early detection and healthy lifestyle habits.
          To raise awareness about diabetes and its prevention, promoting healthy lifestyle habits.
        </p>
        <img
          className="img4_vida_sana_contenedor_3_home"
          src={img4_vida_sana_contenedor_3_home}
          alt="Vida sana"
          title="vida sana"
        />
      </section>

      <section className="contenedor_cuarto_home">
        <img
          className="img5_grupito_4z_contenedor_4_home"
          src={img5_grupito_4z_contenedor_4_home}
          alt="Grupo de estudiantes"
          title="grupo de estudiantes"
        />
        <div className="contenido_texto3_home">
          <h2 className="subtitulo3">¿Quienes somos?</h2>
          <p className="parrafo4">
            We are a group of students committed to public health and
            technology, who have developed this platform as part of
            an academic project. Our motivation stems from the desire to apply
            our knowledge of computer science to generate a positive impact
            on society.
          </p>
        </div>
      </section>

      <section className="contenedor_quinto_home">
        <h2 className="subtitulo4">
          What do we offer and how does the prediction work?
        </h2>
        <p className="parrafo5">
          We offer a digital tool that analyzes your personal data and
          lifestyle habits to estimate your risk of developing
          type 2 diabetes. The system works through a short questionnaire
          in which you enter data such as:{" "}
        </p>
        <ul className="datos_encuesta">
          <li>Age</li>
          <li>Weight and height (to calculate BMI)</li>
          <li>Physical activity</li>
          <li>Blood pressure</li>
          <li>Family history</li>
          <li>Glucose levels</li>
        </ul>
        <p className="parrafo6">
          Con base en estos datos, el sistema utiliza un modelo de predicción
          para evaluar el riesgo de desarrollar diabetes tipo 2, proporcionando
          recomendaciones personalizadas para mejorar la salud y prevenir la
          enfermedad.
        </p>
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
          <Link to="/Pag_Evaluacion">Inicia tu evaluación</Link>
        </nav>
      </section>
    </>
  );
}
