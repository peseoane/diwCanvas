class Canvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.balls = [];
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  addBall(ball) {
    this.balls.push(ball);
  }

  drawBalls() {
    this.clearCanvas();
    for (const ball of this.balls) {
      ball.draw(this.ctx);
    }
  }

  checkCollision(ball) {
    if (ball.x + ball.radius > this.width || ball.x - ball.radius < 0) {
      ball.dx *= -1;
    }
    if (ball.y + ball.radius > this.height || ball.y - ball.radius < 0) {
      ball.dy *= -1;
    }

    for (const otherBall of this.balls) {
      if (otherBall !== ball) {
        const dx = otherBall.x - ball.x;
        const dy = otherBall.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.radius + otherBall.radius) {
          // ¿Colisión?
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Swapeamos las velocidades esto es una aproximación
          const vx1 = ball.dx * cos + ball.dy * sin;
          const vy1 = ball.dy * cos - ball.dx * sin;
          const vx2 = otherBall.dx * cos + otherBall.dy * sin;
          const vy2 = otherBall.dy * cos - otherBall.dx * sin;

          // Intercambiar velocidades en dirección x
          [ball.dx, otherBall.dx] = [vx2, vx1];

          // Mantener velocidades en dirección y
          ball.dy = vy1;
          otherBall.dy = vy2;

          const overlap = ball.radius + otherBall.radius - distance;
          const offsetX = (overlap / 2) * Math.cos(angle);
          const offsetY = (overlap / 2) * Math.sin(angle);

          ball.x -= offsetX;
          ball.y -= offsetY;
          otherBall.x += offsetX;
          otherBall.y += offsetY;
        }
      }
    }
  }
}

class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = this.getRandomColor();
    this.number = Math.floor(Math.random() * 9) + 1;
    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;
  }

  getRandomColor() {
    const colors = [
      "red",
      "yellow",
      "blue",
      "purple",
      "orange",
      "green",
      "maroon",
      "black",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];
    colors.splice(randomIndex, 1);
    return selectedColor;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius - 20, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = `${this.radius}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.number, this.x, this.y);
  }
}

console.log("Página cargada");
const canvas = new Canvas("canvasBillar");
const ball1 = new Ball(100, 100, 50);
const ball2 = new Ball(200, 200, 50);
canvas.addBall(ball1);
canvas.addBall(ball2);
ball1.dx = 5;
ball1.dy = 5;
setInterval(() => {
  for (const ball of canvas.balls) {
    ball.x += ball.dx;
    ball.y += ball.dy;
    canvas.checkCollision(ball);
    canvas.drawBalls();
  }
}, 10);
