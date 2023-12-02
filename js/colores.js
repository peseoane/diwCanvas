class Cuadrado {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = this.generarColor();
  }

  generarColor() {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    return randomColor;
  }

  dibujar() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  actualizarColor() {
    this.color = this.generarColor();
  }
}

function dibujarCuadrados() {
  ctx && ctx.clearRect(0, 0, canvas.width, canvas.height);
  cuadrados.forEach((cuadrado) => cuadrado.dibujar());
}

function actualizarColores() {
  cuadrados.forEach((cuadrado) => cuadrado.actualizarColor());
}

const canvas = document.getElementById("canvasColores");
const ctx = canvas && canvas.getContext("2d");
let numCuadrados = 8;
const cuadradoAlto = canvas.height / numCuadrados;
const cuadradoAncho = canvas.width / numCuadrados;
const cuadrados = [];

for (let i = 0; i < numCuadrados; i++) {
  const cuadrado = new Cuadrado(
    ctx,
    i * cuadradoAncho * 0.77,
    i * cuadradoAlto * 0.77,
    cuadradoAncho * 1.33,
    cuadradoAlto * 1.33,
  );
  cuadrado.dibujar();
  cuadrados.push(cuadrado);
}

const slider = document.getElementById("numeroCuadradosSlider");
slider.addEventListener("input", function () {
  const newSpeed = slider.value;
  speedValue.textContent = newSpeed;
  console.log(newSpeed);
  numCuadrados = newSpeed;

  // Vacía el array de cuadrados
  cuadrados.length = 0;

  // Recalcula el tamaño de los cuadrados
  const cuadradoAlto = canvas.height / numCuadrados;
  const cuadradoAncho = canvas.width / numCuadrados;

  // Crea los nuevos cuadrados
  for (let i = 0; i < numCuadrados; i++) {
    const cuadrado = new Cuadrado(
      ctx,
      i * cuadradoAncho * 0.77,
      i * cuadradoAlto * 0.77,
      cuadradoAncho * 1.33,
      cuadradoAlto * 1.33,
    );
    cuadrados.push(cuadrado);
  }

  // Redibuja los cuadrados
  dibujarCuadrados();
});

setInterval(function () {
  for (const cuadrado of cuadrados) {
    cuadrado.actualizarColor();
  }
  dibujarCuadrados();
}, 1000);
