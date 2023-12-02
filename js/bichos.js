let ctx;
let canvas;
const bichos = [];
let timeElapsed = 0;
let timeInterval;
const images = Array.from({ length: 641 }, (_, i) => `../svg/pokemon/${i}.svg`);

function init() {
  canvas = document.getElementById("canvasBichos");
  if (canvas && canvas.getContext) {
    ctx = canvas.getContext("2d");
    canvas.addEventListener("click", detectClick);
    startTimer();
    drawRandomBichos();
    setInterval(function () {
      clearClock();
      drawTimeAndCount();
    }, 100); // Actualiza cada 100ms
  } else {
    alert("Error al crear el contexto");
  }
}

function flashBackground(color, duration) {
  document.body.style.backgroundColor = color;

  setTimeout(function () {
    document.body.style.backgroundColor = "";
  }, duration);
}

function detectClick(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const scaledX = (event.clientX - rect.left) * scaleX;
  const scaledY = (event.clientY - rect.top) * scaleY;

  /**
   * Este rollo es para ajustar dado que el canvas es 4:3 800x600 y el viewport
   * se define por CSS posteriormente y las coordenadas hay que trasladarlas...
   * nada fancy, solo cosas lineales.
   */

  for (let i = 0; i < bichos.length; i++) {
    const bicho = bichos[i];
    if (
      scaledX >= bicho.x &&
      scaledX <= bicho.x + bicho.width &&
      scaledY >= bicho.y &&
      scaledY <= bicho.y + bicho.height
    ) {
      bichos.splice(i, 1);
      drawTimeAndCount();
      drawExplosion(bicho.x, bicho.y, bicho.width, bicho.height);
      flashBackground("red", 100);
      drawRandomBicho();
      clearBichos();
    }
  }
}

function clearBichos() {
  ctx.clearRect(0, 30, canvas.width, canvas.height - 30);
  drawBichos();
}

function clearClock() {
  ctx.clearRect(0, 0, canvas.width, 30);
}

function startTimer() {
  timeInterval = setInterval(function () {
    timeElapsed++; // Incrementa el tiempo elapsed cada segundo
  }, 1000);
}

function drawTimeAndCount() {
  clearClock();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, 30);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Time: " + timeElapsed, 10, 20);
  ctx.textAlign = "center";
  ctx.fillText("Bichos matados: " + (5 - bichos.length), canvas.width / 2, 20);
}

function drawRandomBichos() {
  drawRandomBicho();
}

function drawExplosion(x, y, width, height) {
  src = "../img/explosion.gif";
  const explosion = new Image();
  explosion.src = src;
  explosion.onload = function () {
    ctx.drawImage(explosion, x, y, width, height);
  };
}

/*
function drawTimeBar() {
    // draw on the top part of the canvas a time clock
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Time: " + timeElapsed, 10, 15);
}*/

function drawRandomBicho() {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const bicho = new Image();
  bicho.src = randomImage;
  bicho.onload = function () {
    const maxSize = Math.min((canvas.width * 2) / 6, (canvas.height * 2) / 6);
    const side = getRandomNumber(20, maxSize);

    let x, y;
    do {
      x = getRandomNumber(0, canvas.width - side);
      y = getRandomNumber(0, canvas.height - side);
    } while (isOverlapping(x, y, side));

    ctx.drawImage(bicho, x, y, side, side);
    bichos.push({ x, y, width: side, height: side });
  };
}

function drawBichos() {
  for (const bicho of bichos) {
    const bichoImg = new Image();
    bichoImg.src = images[Math.floor(Math.random() * images.length)];
    bichoImg.onload = function () {
      ctx.drawImage(bichoImg, bicho.x, bicho.y, bicho.width, bicho.height);
    };
  }
}

function increaseTimeElapsed(amount) {
  timeElapsed += amount;
  drawTimeAndCount(); // Actualiza el tiempo y el contador
}

function isOverlapping(x, y, side) {
  for (const bicho of bichos) {
    if (
      x < bicho.x + bicho.width &&
      x + side > bicho.x &&
      y < bicho.y + bicho.height &&
      y + side > bicho.y
    ) {
      return true;
    }
  }
  return false;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

init();
