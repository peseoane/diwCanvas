class Canvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

class Monigote {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.armAngle = 0; // Ángulo inicial del brazo
  }

  draw(ctx) {
    // Dibuja el cuerpo
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x - 20, this.y - 30, 40, 60);

    // Dibuja la cabeza
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y - 40, 20, 0, Math.PI * 2);
    ctx.fill();

    // Dibuja el brazo
    const armEndX = this.x + 40 * Math.cos(this.armAngle);
    const armEndY = this.y - 40 * Math.sin(this.armAngle);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - 30);
    ctx.lineTo(armEndX, armEndY);
    ctx.stroke();
  }

  moveArm(angleChange) {
    this.armAngle += angleChange;
  }
}

class ActionHandler {
  constructor(monigote) {
    this.monigote = monigote;
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    if (event.key == " " || event.code == "Space" || event.keyCode == 32) {
      console.log("Espacio pulsado @ " + event.timeStamp);
      this.monigote.moveArm(Math.PI / 180);
      canvas.clearCanvas();
      this.monigote.draw(canvas.ctx);
    }
  }
}

const canvas = new Canvas("canvas");
const monigote = new Monigote(400, 300);
monigote.draw(canvas.ctx);
const actionHandler = new ActionHandler(monigote);
