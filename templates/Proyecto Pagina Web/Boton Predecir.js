function predecir() {
  // Obtener valores
  const glucosa = parseFloat(document.querySelector("input[placeholder='Nivel de glucosa en ayunas']").value);
  const presion = parseFloat(document.querySelector("input[placeholder='Presión arterial']").value);
  const insulina = parseFloat(document.querySelector("input[placeholder='Insulina sérica']").value);
  const edad = parseFloat(document.querySelector("input[placeholder='Edad']").value);
  const pliegue = parseFloat(document.querySelector("input[placeholder='Espesor en mm']").value);
  const pedigri = parseFloat(document.querySelector("input[placeholder='Pedigrí']").value);
  const embarazos = parseFloat(document.querySelector("input[placeholder='Número de embarazos']").value);
  const imc = parseFloat(document.querySelector("input[placeholder='IMC']").value);

  // Validación simple
  if (isNaN(glucosa) || isNaN(presion) || isNaN(insulina) || isNaN(edad) ||
      isNaN(pliegue) || isNaN(pedigri) || isNaN(embarazos) || isNaN(imc)) {
    document.getElementById("resultado").innerText = "Por favor, complete todos los campos.";
    return;
  }

  // Puntuación por criterios de riesgo
  let puntos = 0;
  let total = 8;

  if (glucosa >= 100) puntos++;
  if (presion >= 130) puntos++;
  if (insulina >= 15) puntos++;
  if (edad >= 40) puntos++;
  if (pliegue >= 20) puntos++;
  if (pedigri >= 0.5) puntos++;
  if (embarazos >= 3) puntos++;
  if (imc >= 25) puntos++;

  const porcentaje = (puntos / total) * 100;

  let mensaje = "";

  if (porcentaje < 30) {
    mensaje = `Baja probabilidad de diabetes tipo 2 (${porcentaje.toFixed(1)}%)`;
  } else if (porcentaje < 70) {
    mensaje = `Probabilidad media de diabetes tipo 2 (${porcentaje.toFixed(1)}%)`;
  } else {
    mensaje = `Alta probabilidad de diabetes tipo 2 (${porcentaje.toFixed(1)}%)`;
  }

  window.location.href = "../diabetes2v3/index.html";
}
