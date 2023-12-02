// Ball.js
class Ball {
  constructor(x, y, radius, color, speed, directionX, directionY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.directionX = directionX;
    this.directionY = directionY;
  }

  move() {
    this.x += this.speed * this.directionX;
    this.y += this.speed * this.directionY;
  }
}

// Paddle.js
class Paddle {
  constructor(x, y, width, height, color, dy) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dy = dy;
  }

  move(canvasHeight) {
    this.y += this.dy;

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > canvasHeight - this.height) {
      this.y = canvasHeight - this.height;
    }
  }
}

// CanvasHandler.js
class CanvasHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBall(ball) {
    this.ctx.fillStyle = ball.color;
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawPaddle(paddle) {
    this.ctx.fillStyle = paddle.color;
    this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  }

  drawScore(playerScore, aiScore) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    const x = this.width / 2;
    const y = 30;
    this.ctx.fillText(`Player: ${playerScore}  AI: ${aiScore}`, x, y);
  }

  drawMessage(message) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(message, this.width / 2, this.height / 2);
  }
}

// Pong.js
class Pong {
  constructor(canvas) {
    this.canvas = canvas;
    this.ball = new Ball(100, 100, 10, "red", 5, 1, 1);
    this.playerPaddle = new Paddle(
      10,
      canvas.height / 2 - 50,
      10,
      100,
      "blue",
      0,
    );
    this.aiPaddle = new Paddle(
      canvas.width - 20,
      canvas.height / 2 - 50,
      10,
      100,
      "green",
      0,
    );
    this.playerScore = 0;
    this.aiScore = 0;
    this.gameRunning = false;
    this.canvasHandler = new CanvasHandler(canvas);
    this.soundEnabled = true;
  }

  reset() {
    this.ball = new Ball(100, 100, 10, "red", 5, 1, 1);
    this.playerPaddle = new Paddle(
      10,
      this.canvas.height / 2 - 50,
      10,
      100,
      "blue",
      0,
    );
    this.aiPaddle = new Paddle(
      this.canvas.width - 20,
      this.canvas.height / 2 - 50,
      10,
      100,
      "green",
      0,
    );
    this.gameRunning = false;
  }

  start() {
    this.gameRunning = true;
    this.ball.directionX = Math.random() < 0.5 ? -1 : 1;
    this.ball.directionY = Math.random() < 0.5 ? -1 : 1;
  }

  update() {
    if (!this.gameRunning) {
      return;
    }

    this.ball.move();
    this.checkLegalBounds();
    if (this.checkPaddleHit()) {
      playHit();
    }
    if (this.ball.x - this.ball.radius < 0) {
      this.aiScore++;
      this.gameRunning = false;
      playDie();
    } else if (this.ball.x + this.ball.radius > this.canvas.width) {
      this.playerScore++;
      this.gameRunning = false;
      playBeep();
    }
  }

  updateAI() {
    if (!this.gameRunning) {
      return;
    }

    if (this.aiPaddle.y + this.aiPaddle.height / 2 < this.ball.y) {
      this.aiPaddle.dy = 4;
    } else {
      this.aiPaddle.dy = -4;
    }
    this.aiPaddle.move(this.canvas.height);
  }

  updatePlayerPaddle(dy) {
    this.playerPaddle.dy = dy;
  }

  draw() {
    this.canvasHandler.clearCanvas();
    this.canvasHandler.drawBall(this.ball);
    this.canvasHandler.drawPaddle(this.playerPaddle);
    this.canvasHandler.drawPaddle(this.aiPaddle);
    this.canvasHandler.drawScore(this.playerScore, this.aiScore);
    if (!this.gameRunning) {
      const message =
        this.playerScore > this.aiScore
          ? "You win! press ENTER"
          : "You lose! 💀 press ENTER";
      this.canvasHandler.drawMessage(message);
    }
  }

  drawSoundButton() {
    this.canvasHandler.ctx.fillStyle = this.soundEnabled ? "green" : "red";
    this.canvasHandler.ctx.fillRect(10, 10, 50, 50);
  }

  toggleSound(x, y) {
    if (x >= 10 && x <= 60 && y >= 10 && y <= 60) {
      this.soundEnabled = !this.soundEnabled;
    }
  }

  checkLegalBounds() {
    if (this.ball.y - this.ball.radius < 0) {
      this.ball.directionY = 1;
    } else if (this.ball.y + this.ball.radius > this.canvas.height) {
      this.ball.directionY = -1;
    }
  }

  checkPaddleHit() {
    if (
      this.ball.x - this.ball.radius <
        this.playerPaddle.x + this.playerPaddle.width &&
      this.ball.y > this.playerPaddle.y &&
      this.ball.y < this.playerPaddle.y + this.playerPaddle.height &&
      this.ball.directionX === -1
    ) {
      this.ball.directionX = 1;
      return true;
    } else if (
      this.ball.x + this.ball.radius > this.aiPaddle.x &&
      this.ball.y > this.aiPaddle.y &&
      this.ball.y < this.aiPaddle.y + this.aiPaddle.height &&
      this.ball.directionX === 1
    ) {
      this.ball.directionX = -1;
      return true;
    }
    return false;
  }
}

// main.js
const canvasPong = document.getElementById("canvasPong");
const pong = new Pong(canvasPong);

function gameLoop() {
  pong.update();
  pong.updateAI();
  pong.playerPaddle.move(canvasPong.height);
  pong.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    pong.updatePlayerPaddle(-5);
  } else if (event.key === "ArrowDown") {
    pong.updatePlayerPaddle(5);
  } else if (event.key === "Enter" && !pong.gameRunning) {
    pong.reset();
    pong.start();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    pong.updatePlayerPaddle(0);
  }
});

function playBeep() {
  const beep = new Audio("../assets/win.opus");
  beep.play();
}

function playDie() {
  const beep = new Audio("../assets/bruh.opus");
  beep.play();
}

function playHit() {
  const beep = new Audio("../assets/squash.m4a");
  beep.play();
}

canvasPong.addEventListener("click", (event) => {
  pong.toggleSound(event.offsetX, event.offsetY);
  pong.drawSoundButton();
});
