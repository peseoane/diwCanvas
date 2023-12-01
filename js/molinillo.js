/**
 * Represents a Wind Pinwheel.
 * @constructor
 * @param {HTMLCanvasElement} canvas - The HTML canvas element to draw the pinwheel on.
 * @param {number} pinwheelSize - The size of the pinwheel arms.
 * @param {number} poleWidth - The width of the pole.
 * @param {number} poleHeight - The height of the pole.
 */
class WindPinwheel {
  constructor(canvas, pinwheelSize, poleWidth, poleHeight) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.pinwheelSize = pinwheelSize;
    this.poleWidth = poleWidth;
    this.poleHeight = poleHeight;
    this.rotationAngle = 0;

    // Call the draw method every 16 milliseconds for smoother movement
    setInterval(this.draw.bind(this), 16);
  }

  /**
   * Draws the Wind Pinwheel on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Get the current theme
    const currentTheme = document.documentElement.getAttribute("data-theme");

    // Set the pole color based on the current theme
    const poleColor = currentTheme === "dark" ? "white" : "black";

    // Draw the main pole
    this.ctx.fillStyle = poleColor;
    this.ctx.fillRect(
      this.canvas.width / 2 - this.poleWidth / 2,
      this.canvas.height / 2 - this.poleHeight,
      this.poleWidth,
      this.poleHeight,
    );

    // Save the current context state
    this.ctx.save();

    // Translate to the top of the pole
    this.ctx.translate(
      this.canvas.width / 2,
      this.canvas.height / 2 - this.poleHeight,
    );

    // Rotate the pinwheel
    this.ctx.rotate(this.rotationAngle);

    // Draw the pinwheel arms (triangles) with different colors
    for (let i = 0; i < 4; i++) {
      // Assign a different color to each arm
      const color = `hsl(${
        (i * 90 + this.rotationAngle * (180 / Math.PI)) % 360
      }, 70%, 50%)`;

      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.pinwheelSize / 2, 0);
      this.ctx.lineTo(0, this.pinwheelSize * 0.8);
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.rotate((Math.PI / 180) * 90); // Rotate 90 degrees for each arm
    }

    // Restore the saved context state
    this.ctx.restore();

    // Update rotation angle for fluid movement
    this.rotationAngle += (Math.PI / 180) * 2; // Rotate 2 degrees per frame
  }
}

const windPinwheel = new WindPinwheel(
  document.getElementById("canvasMolinillo"),
  50,
  10,
  100,
);
