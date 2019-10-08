import AudioControl from "./AudioControl";

export default class Knob extends AudioControl {
  constructor(...args) {
    super(...args);

    this._angle = 0;
    this._background = null;
    this._rotating = false;
    this._knob = null;
    this._needle = null;
    this._zeroOffset = 90;
  }

  append() {
    this._instance = this._ctx.group();
    this._instance.move(this.offsetLeft, this.offsetTop);

    this._background = this._instance.rect(this.size, this.size);
    this._background.fill(this.backgroundColor);

    this._knob = this._instance.circle(this.radius);
    this._knob.fill(this.fillColor);
    this._knob.stroke({ color: this.strokeColor, width: this.strokeWidth });
    this._knob.move(this.padding, this.padding);

    const { x1, y1, x2, y2 } = this.defaultOrientation;
    this._needle = this._instance.line(x1, y1, x2, y2);
    this._needle.stroke({
      color: this.needleColor,
      linecap: "round",
      width: this.strokeWidth
    });
  }

  /**
   * Getters
   */

  get angle() {
    return this._angle;
  }

  get backgroundColor() {
    return this._options.backgroundColor || "#fff";
  }

  get centerX() {
    return this.offsetLeft + this.size / 2;
  }

  get centerY() {
    return this.offsetTop + this.size / 2;
  }

  get defaultOrientation() {
    return {
      x1: this.size / 2,
      y1: this.size / 2,
      x2: this.size / 2,
      y2: this.size - (this.strokeWidth + this.strokeWidth / 2)
    };
  }

  get fillColor() {
    return this._options.fillColor || "#ccc";
  }

  get isRotating() {
    return this._rotating;
  }

  get needleColor() {
    return this._options.needleColor || "#f70";
  }

  get offsetLeft() {
    return this._options.offsetLeft || 0;
  }

  get offsetTop() {
    return this._options.offsetTop || 0;
  }

  get padding() {
    return this._options.padding || 10;
  }

  get radius() {
    return this._options.radius || 50;
  }

  get size() {
    return this.radius + this.padding * 2;
  }

  get strokeColor() {
    return this._options.strokeColor || "#333";
  }

  get strokeWidth() {
    return this._options.strokeWidth || 5;
  }

  /**
   * Setters
   */

  set angle(value) {
    this._angle = value;
  }

  set isRotating(value) {
    this._rotating = value;
  }
}
