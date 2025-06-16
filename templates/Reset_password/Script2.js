document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("resetBtn");
    const backBtn = document.getElementById("backBtn");

    // Acción para el botón de reset
    resetBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Detiene el envío del formulario
        
    });

    // Acción para el botón de volver
    backBtn.addEventListener("click", () => {
        window.history.back(); // Regresa a la página anterior
    });
});