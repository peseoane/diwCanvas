class Canvas {
  constructor(target) {
    this.canvas = document.getElementById(target);
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 600;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class Coordenada {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Faro {
  constructor() {
    this.base = [
      new Coordenada(200, 600),
      new Coordenada(600, 600),
      new Coordenada(600, 580),
      new Coordenada(200, 580),
    ];

    this.contorno = [
      new Coordenada(285, 600),
      new Coordenada(300, 500),
      new Coordenada(350, 200),
      new Coordenada(450, 200),
      new Coordenada(500, 500),
      new Coordenada(515, 600),
    ];

    this.rayaInferior = [
      new Coordenada(300, 500),
      new Coordenada(316, 400),
      new Coordenada(484, 400),
      new Coordenada(500, 500),
    ];

    this.rayaSuperior = [
      new Coordenada(332, 300),
      new Coordenada(466, 300),
      new Coordenada(458, 250),
      new Coordenada(340, 250),
    ];

    this.cabeza = [
      new Coordenada(340, 200),
      new Coordenada(458, 200),
      new Coordenada(458, 180),
      new Coordenada(340, 180),
    ];

    this.cristal = [
      new Coordenada(350, 180),
      new Coordenada(450, 180),
      new Coordenada(450, 120),
      new Coordenada(350, 120),
    ];

    this.triangulo = [
      new Coordenada(320, 120),
      new Coordenada(480, 120),
      new Coordenada(400, 80),
    ];

    this.luz = [
      new Coordenada(450, 180),
      new Coordenada(450, 120),
      new Coordenada(800, 120),
      new Coordenada(800, 500),
    ];
  }

  drawShape(ctx, coordenadas, color, fill = true, rounded = false) {
    ctx.beginPath();
    ctx.moveTo(coordenadas[0].x, coordenadas[0].y);
    for (let i = 1; i < coordenadas.length; i++) {
      if (rounded) {
        // Si se requieren lados redondeados, dibuja arcos en lugar de líneas
        const x = (coordenadas[i - 1].x + coordenadas[i].x) / 2;
        const y = (coordenadas[i - 1].y + coordenadas[i].y) / 2;
        ctx.quadraticCurveTo(coordenadas[i - 1].x, coordenadas[i - 1].y, x, y);
      } else {
        ctx.lineTo(coordenadas[i].x, coordenadas[i].y);
      }
    }
    if (rounded) {
      const x = (coordenadas[coordenadas.length - 1].x + coordenadas[0].x) / 2;
      const y = (coordenadas[coordenadas.length - 1].y + coordenadas[0].y) / 2;
      ctx.quadraticCurveTo(
        coordenadas[coordenadas.length - 1].x,
        coordenadas[coordenadas.length - 1].y,
        x,
        y,
      );
    } else {
      ctx.closePath();
    }
    ctx.strokeStyle = "black";
    ctx.fillStyle = color;
    if (fill) {
      ctx.fill();
    }
    ctx.stroke();
  }

  drawDegradado(ctx, coordenadas, degradado) {
    ctx.beginPath();
    ctx.moveTo(coordenadas[0].x, coordenadas[0].y);
    for (let i = 1; i < coordenadas.length; i++) {
      ctx.lineTo(coordenadas[i].x, coordenadas[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = degradado;
    ctx.fill();
  }

  draw(ctx) {
    this.drawShape(ctx, this.contorno, "white");
    this.drawShape(ctx, this.rayaInferior, "red");
    this.drawShape(ctx, this.rayaSuperior, "red");
    this.drawShape(ctx, this.cabeza, "blue");
    this.drawShape(ctx, this.triangulo, "lightblue");

    if (this.lightOn) {
      this.drawShape(ctx, this.cristal, "yellow");
      const luzDegradado = ctx.createLinearGradient(450, 180, 800, 500);
      luzDegradado.addColorStop(0, "yellow");
      luzDegradado.addColorStop(1, "rgba(255, 255, 0, 0)");
      this.drawDegradado(ctx, this.luz, luzDegradado);
    } else {
      this.drawShape(ctx, this.cristal, "lightyellow", false);
    }
    this.drawShape(ctx, this.base, "black");

    ctx.beginPath();
    ctx.arc(200, 600, 20, 0, Math.PI, true);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(600, 600, 20, 0, Math.PI, true);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  toggleLight() {
    this.lightOn = !this.lightOn;
  }
}

let canvas = new Canvas("canvasFaro");
let faro = new Faro();
faro.draw(canvas.context);

setInterval(function () {
  faro.toggleLight();
  canvas.clearCanvas();
  faro.draw(canvas.context);
}, 2000);