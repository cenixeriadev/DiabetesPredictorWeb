document.addEventListener("DOMContentLoaded", function () {
  fetch("../Proyecto Pagina Web/Footer.html")
    .then(response => response.text())
    .then(data => 
      document.getElementById("footerprincipal").innerHTML = data);
    })

