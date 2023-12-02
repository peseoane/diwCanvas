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
    } else if (gameName === "bolas") {
      const controlsContainer = document.createElement("div");
      controlsContainer.id = "controlesCircunferencia";

      const speedSlider = document.createElement("input");
      speedSlider.id = "speedSlider";
      speedSlider.type = "range";
      speedSlider.min = "1";
      speedSlider.max = "20";
      speedSlider.value = "1";
      speedSlider.className = "slider";
      controlsContainer.appendChild(speedSlider);

      const speedLabel = document.createElement("label");
      speedLabel.id = "speedLabel";
      speedLabel.textContent = "Speed";
      controlsContainer.appendChild(speedLabel);

      const speedValue = document.createElement("label");
      speedValue.id = "speedValue";
      speedValue.textContent = "50";
      controlsContainer.appendChild(speedValue);

      gameContainer.appendChild(controlsContainer);
    } else if (gameName === "colores") {
      const controlsContainer = document.createElement("div");
      controlsContainer.id = "controlesCuadrados";

      const numeroCuadradosSlider = document.createElement("input");
      numeroCuadradosSlider.id = "numeroCuadradosSlider";
      numeroCuadradosSlider.type = "range";
      numeroCuadradosSlider.min = "7";
      numeroCuadradosSlider.max = "70";
      numeroCuadradosSlider.value = "7";
      numeroCuadradosSlider.className = "slider";
      controlsContainer.appendChild(numeroCuadradosSlider);

      const numCuadradosLabel = document.createElement("label");
      numCuadradosLabel.id = "numCuadradosLabel";
      numCuadradosLabel.textContent = "Numero de cuadrados";
      controlsContainer.appendChild(numCuadradosLabel);

      const numCuadradosValue = document.createElement("label");
      numCuadradosValue.id = "speedValue";
      numCuadradosValue.textContent = "50";
      controlsContainer.appendChild(numCuadradosValue);
      gameContainer.appendChild(controlsContainer);
    }
  });
});
