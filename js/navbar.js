fetch('../templates/navbar.html')
    .then(response => response.text())
    .then(content => {
        const navegacion = document.getElementById('navegacion');
        navegacion.innerHTML = content;
    });

fetch('../templates/footer.html')
    .then(response => response.text())
    .then(content => {
        const navegacion = document.getElementById('piePagina');
        navegacion.innerHTML = content;
    });