/**
 * Clase que representa un lienzo HTML5.
 */
class Canvas {
  /**
   * Crea un nuevo objeto Canvas.
   * @param {string} target - El ID del elemento HTML del lienzo.
   */
  constructor(target) {
    this.canvas = document.getElementById(target);
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 600;
  }

  /**
   * Borra el contenido del lienzo.
   */
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Obtiene el contexto 2D del lienzo.
   * @returns {CanvasRenderingContext2D} - El contexto 2D del lienzo.
   */
  getContext() {
    return this.context;
  }
}

/**
 * Clase que representa una circunferencia.
 */
class Circunferencia {
  /**
   * Crea un nuevo objeto Circunferencia.
   * @param {number} radius - El radio del círculo.
   * @param {number} x - La coordenada x del centro del círculo.
   * @param {number} y - La coordenada y del centro del círculo.
   * @param {CanvasRenderingContext2D} context - El contexto del lienzo.
   */
  constructor(radius, x, y, context) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.context = context;
  }

  /**
   * Dibuja el círculo en el lienzo.
   * @param {string} strokeColor - El color del trazo.
   * @param {string} fillColor - El color del relleno.
   * @param {boolean} stroke - Indica si se debe trazar el círculo.
   * @param {boolean} fill - Indica si se debe rellenar el círculo.
   */
  draw(strokeColor, fillColor, stroke, fill) {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    if (stroke) {
      this.context.strokeStyle = strokeColor;
      this.context.stroke();
    }
    if (fill) {
      this.context.fillStyle = fillColor;
      this.context.fill();
    }
  }
}

/**
 * Clase que representa una animación de una circunferencia girando alrededor de otra.
 */
class AnimatedCircles {
  /**
   * Crea una nueva animación de círculos.
   * @param {Canvas} canvas - El objeto de lienzo.
   * @param {number} outerRadius - El radio del círculo exterior.
   * @param {number} innerRadius - El radio del círculo interior.
   * @param {number} speed - La velocidad de la animación.
   */
  constructor(canvas, outerRadius, innerRadius, speed) {
    this.canvas = canvas;
    this.outerCircle = new Circunferencia(
      outerRadius,
      canvas.canvas.width / 2,
      canvas.canvas.height / 2,
      canvas.getContext(),
    );
    this.innerCircle = new Circunferencia(
      innerRadius,
      null, // auto...
      null,
      canvas.getContext(),
    );
    this.angle = 0;
    this.speed = speed; // Establece la velocidad
  }

  adjustSpeed(newSpeed) {
    this.speed = newSpeed;
  }
  /**
   * Actualiza y dibuja la animación en el lienzo.
   * @param {string} outerStrokeColor - El color del trazo del círculo exterior.
   * @param {string} outerFillColor - El color del relleno del círculo exterior.
   * @param {string} innerStrokeColor - El color del trazo del círculo interior.
   * @param {string} innerFillColor - El color del relleno del círculo interior.
   */
  update(outerStrokeColor, outerFillColor, innerStrokeColor, innerFillColor) {
    const xCenter = this.canvas.canvas.width / 2;
    const yCenter = this.canvas.canvas.height / 2;
    const xInner =
      xCenter +
      (this.outerCircle.radius - this.innerCircle.radius) *
        Math.cos(this.angle);
    const yInner =
      yCenter +
      (this.outerCircle.radius - this.innerCircle.radius) *
        Math.sin(this.angle);

    this.innerCircle.x = xInner;
    this.innerCircle.y = yInner;

    this.canvas.clearCanvas();
    this.outerCircle.draw(outerStrokeColor, outerFillColor, true, false);
    this.innerCircle.draw(innerStrokeColor, innerFillColor, true, false);

    this.angle += this.speed * 0.02;
    requestAnimationFrame(
      this.update.bind(
        this,
        outerStrokeColor,
        outerFillColor,
        innerStrokeColor,
        innerFillColor,
      ),
    );
  }

  /**
   * Inicia la animación.
   * @param {string} outerStrokeColor - El color del trazo del círculo exterior.
   * @param {string} outerFillColor - El color del relleno del círculo exterior.
   * @param {string} innerStrokeColor - El color del trazo del círculo interior.
   * @param {string} innerFillColor - El color del relleno del círculo interior.
   */
  start(outerStrokeColor, outerFillColor, innerStrokeColor, innerFillColor) {
    this.update(
      outerStrokeColor,
      outerFillColor,
      innerStrokeColor,
      innerFillColor,
    );
  }
}

/**
 * Función que se ejecuta cuando la ventana ha cargado.
 */
const slider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const initialSpeed = slider.value;
const canvas = new Canvas("canvasBolas");
const animatedCircles = new AnimatedCircles(canvas, 200, 80, slider.value);

slider.addEventListener("input", function () {
  const newSpeed = slider.value;
  speedValue.textContent = newSpeed;
  animatedCircles.adjustSpeed(newSpeed);
  console.log(newSpeed);
});

outline =
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "white"
    : "black";

animatedCircles.start(outline, outline, outline, "lightblue");

speedValue.textContent = initialSpeed;
animatedCircles.adjustSpeed(initialSpeed);