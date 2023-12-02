document.querySelectorAll(".miniaturaJuego").forEach(function (gameElement) {
  gameElement.addEventListener("click", function () {
    const existingGame = document.querySelector(".juegoActivo");
    if (existingGame) {
      document.body.removeChild(existingGame);
    }

    const gameName = this.id.replace("miniatura", "").toLowerCase();

    const gameContainer = document.createElement("div");
    gameContainer.className = "juegoActivo";

    const closeButton = document.createElement("button");
    closeButton.textContent = "";
    closeButton.addEventListener("click", function () {
      document.body.removeChild(gameContainer);
      location.reload();
    });

    gameContainer.appendChild(closeButton);

    const canvas = document.createElement("canvas");
    canvas.id = `canvas${gameName.charAt(0).toUpperCase() + gameName.slice(1)}`;
    canvas.width = 800;
    canvas.height = 600;
    gameContainer.appendChild(canvas);
    console.log("Creado el canvas : " + canvas.id);

    document.body.appendChild(gameContainer);

    const cssLink = document.createElement("link");
    cssLink.id = `${gameName}Css`;
    cssLink.rel = "stylesheet";
    cssLink.href = "../css/canvas.css";

    document.head.appendChild(cssLink);
    let gameIsActive = true;

    const script = document.createElement("script");
    script.id = `${gameName}Script`;
    script.src = `../js/${gameName}.js`;
    script.defer = true;
    console.log("Inyectado el script : " + script.id);

    document.body.appendChild(script);

    if (gameName === "pong") {
      document.addEventListener("keydown", function (event) {
        if (gameIsActive) {
          event.preventDefault();
          // En algunos viewports muy concretos esto evita que nos deslice como
          // en el pong la pantalla al mover arriba y abajo.
        }
      });
    } else if (gameName === "bichos") {
      // es una pena porque el juego está hecho con svgs y si no en 800x600 se ve muy borroso al escalar...
      canvas.width = 1024;
      canvas.height = 768;
    }
  });
});
