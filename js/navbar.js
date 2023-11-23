fetch('../templates/navbar.html')
    .then(response => response.text())
    .then(content => {
        // Selecciona el div con id "navegacion"
        const navegacion = document.getElementById('navegacion');

        // Cambia el innerHTML del div seleccionado
        navegacion.innerHTML = content;
    });