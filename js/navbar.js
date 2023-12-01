fetch("../templates/navbar.html")
  .then((response) => response.text())
  .then((content) => {
    const navegacion = document.getElementById("navegacion");
    navegacion.innerHTML = content;
    const pageId = document
      .querySelector('meta[name="page-id"]')
      .getAttribute("content");
    const navLinks = document.querySelectorAll(".navegacion a");
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
      if (navLinks[i].getAttribute("href").endsWith(`${pageId}.html`)) {
        navLinks[i].classList.add("active");
      }
    }
    document
      .getElementById("menuSiPequeño")
      .addEventListener("click", function (event) {
        event.preventDefault();
        if (window.innerWidth < 800) {
          const dropdownMenu = document.querySelector(".dropdown");
          if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
          } else {
            dropdownMenu.style.display = "block";
          }
        }
      });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) {
        const dropdownMenu = document.querySelector(".dropdown");
        dropdownMenu.style.display = "block";
      }
    });
  });

fetch("../templates/footer.html")
  .then((response) => response.text())
  .then((content) => {
    const navegacion = document.getElementById("piePagina");
    navegacion.innerHTML = content;
  });
