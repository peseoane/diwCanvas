class Tanque {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.angulo = 0;
    this.disparar = true;
    this.bala = null;
    this.longitudC = 90;

    if (this.ctx) {
      this.inicializarEventos();
      this.dibujarTanque();
    } else {
      alert("Error en el código o en ctx");
    }
  }

  inicializarEventos() {
    document.addEventListener("keydown", (e) => this.manejarTecla(e));
    document.addEventListener("keypress", (e) =>
      this.manejarTeclaPresionada(e),
    );
  }

  manejarTecla(e) {
    if (e.key === "ArrowRight") {
      this.angulo += 0.05;
      this.dibujarTanque();
    } else if (e.key === "ArrowLeft") {
      this.angulo -= 0.05;
      this.dibujarTanque();
    }
    console.log("Usuario pulsó la tecla: " + e.key);
  }

  manejarTeclaPresionada(e) {
    e.preventDefault();
    if (e.code === "Space" && this.disparar) {
      console.log("space");
      this.balax = 350 + Math.cos(this.angulo) * this.longitudC;
      this.balay = 380 + Math.sin(this.angulo) * this.longitudC;
      this.anguloBala = this.angulo;
      this.disparar = false;
      this.dibujarBala();
    }
  }

  dibujarTanque() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    this.ctx.fillStyle = "darkgreen";

    // Carrocería
    this.ctx.beginPath();
    this.ctx.fillRect(315, 350, 70, 60);
    this.ctx.strokeRect(315, 350, 70, 60);

    // Ruedas
    this.ctx.beginPath();
    this.ctx.fillRect(300, 330, 100, 20);
    this.ctx.strokeRect(300, 330, 100, 20);
    this.ctx.beginPath();
    this.ctx.fillRect(300, 410, 100, 20);
    this.ctx.strokeRect(300, 410, 100, 20);

    // Cañón
    this.dibujarLinea(350, 380, this.angulo);

    // Cabina
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = "darkgreen";
    this.ctx.beginPath();
    this.ctx.arc(350, 380, 25, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  dibujarLinea(x, y, angulo) {
    this.ctx.fillStyle =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "white"
        : "black";
    this.ctx.lineWidth = 15;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x + Math.cos(angulo) * this.longitudC,
      y + Math.sin(angulo) * this.longitudC,
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  dibujarBala() {
    this.dibujarTanque();
    this.balax += Math.cos(this.anguloBala) * 5;
    this.balay += Math.sin(this.anguloBala) * 5;
    if (
      this.balax <= this.canvas.width &&
      this.balax >= 0 &&
      this.balay <= this.canvas.height &&
      this.balay >= 0
    ) {
      this.ctx.beginPath();
      this.ctx.arc(this.balax, this.balay, 5, 0, Math.PI * 2);

      this.ctx.fillStyle =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "white"
          : "black";

      this.ctx.fill();
      this.ctx.stroke();
      requestAnimationFrame(() => this.dibujarBala());
    } else {
      this.disparar = true;
    }
  }
}

new Tanque("canvasTanque");
