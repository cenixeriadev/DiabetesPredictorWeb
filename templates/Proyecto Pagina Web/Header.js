document.addEventListener("DOMContentLoaded", () => {
    fetch("Header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-principal").innerHTML = data;

            // Aquí ya está cargado el header, ahora puedes modificar el login-link
            const loginLink = document.getElementById("login-link");

            if (localStorage.getItem("logueado") === "true") {
                loginLink.href = "../ProfileInformation.html";
                loginLink.innerHTML = "Usuario";
            }
        });
});
