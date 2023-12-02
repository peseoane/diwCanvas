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

    document.body.appendChild(gameContainer);

    const script = document.createElement("script");
    script.id = `${gameName}Script`;
    script.src = `../js/${gameName}.js`;
    script.defer = true;

    document.body.appendChild(script);

    const cssLink = document.createElement("link");
    cssLink.id = `${gameName}Css`;
    cssLink.rel = "stylesheet";
    cssLink.href = "../css/canvas.css";

    document.head.appendChild(cssLink);
  });
});
