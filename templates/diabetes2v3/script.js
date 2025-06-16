const preguntas = [
  "¿Realizas actividad física (como caminar, correr o ir al gimnasio) al menos 3 veces por semana?",
  "¿Consumes alimentos o bebidas con alto contenido de azúcar (como gaseosas, pasteles, dulces)?",
  "¿Consumes alimentos ultraprocesados (como snacks, embutidos, comidas rápidas) con frecuencia?",
  "¿Tienes antecedentes familiares de diabetes tipo 2 (padres, hermanos/as)?",
  "¿Vas al médico regularmente para controles de salud?",
  "¿Loy es el mejor ajedrecista?"
];

const opciones = [
  { img: "😡", texto: "muy desacuerdo" },
  { img: "😕", texto: "desacuerdo" },
  { img: "😐", texto: "neutral" },
  { img: "🙂", texto: "de acuerdo" },
  { img: "😃", texto: "totalmente de acuerdo" },
];

let preguntaActual = 0;
const quiz = document.getElementById("quiz");
const btnSiguiente = document.getElementById("siguienteBtn");
const btnAnterior = document.getElementById("anteriorBtn");

function mostrarPregunta() {
  quiz.style.opacity = 0;

  setTimeout(() => {
    quiz.innerHTML = `
      <h2>PREGUNTA ${preguntaActual + 1}</h2>
      <p>${preguntas[preguntaActual]}</p>
      <div class="options">
        ${opciones.map(
          (op, index) => `
          <div class="option" onclick="seleccionarOpcion(${index})">
            <div class="emoji" style="font-size: 40px;">${op.img}</div>
            <span>${op.texto}</span>
          </div>`
        ).join("")}
      </div>
      <p id="mensajeError" style="color: red; display: none; margin-top: 20px;">Selecciona una alternativa por favor :)</p>
    `;

    quiz.style.opacity = 1;
    btnAnterior.style.display = preguntaActual > 0 ? "inline-block" : "none";
    btnSiguiente.textContent = preguntaActual === preguntas.length - 1
      ? "Ver resultados →"
      : "Siguiente →";
  }, 300);
}

function seleccionarOpcion(indexSeleccionado) {
  const emojis = document.querySelectorAll(".option .emoji");
  emojis.forEach((emoji, index) => {
    emoji.classList.toggle("selected", index === indexSeleccionado);
  });

  const errorMsg = document.getElementById("mensajeError");
  if (errorMsg) errorMsg.style.display = "none";
}

btnSiguiente.addEventListener("click", () => {
  const seleccion = document.querySelector(".option .emoji.selected");

  if (!seleccion) {
    const errorMsg = document.getElementById("mensajeError");
    if (errorMsg) errorMsg.style.display = "block";
    return;
  }

  if (preguntaActual < preguntas.length - 1) {
    preguntaActual++;
    mostrarPregunta();
  } else {
    window.location.href = "resultados.html";
  }
});

btnAnterior.addEventListener("click", () => {
  if (preguntaActual > 0) {
    preguntaActual--;
    mostrarPregunta();
  }
});

mostrarPregunta();
