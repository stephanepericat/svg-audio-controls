import AudioControl from "./AudioControl";

/**
 * @class Knob
 * @extends AudioControl
 */
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
    this._createGroup({ left: this.offsetLeft, top: this.offsetTop });
    this._createBackground({
      width: this.size,
      height: this.size,
      backgroundColor: this.backgroundColor
    });
    this._createKnob();
    this._createNeedle();

    this._setupEventListeners();
  }

  /**
   * Private methods
   */

  _calculcateSlope(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
  }

  _createKnob() {
    this._knob = this._instance.circle(this.radius);
    this._knob.fill(this.fillColor);
    this._knob.stroke({ color: this.strokeColor, width: this.strokeWidth });
    this._knob.move(this.padding, this.padding);
  }

  _createNeedle() {
    const { x1, y1, x2, y2 } = this.defaultOrientation;
    this._needle = this._instance.line(x1, y1, x2, y2);
    this._needle.stroke({
      color: this.needleColor,
      linecap: "round",
      width: this.strokeWidth
    });
  }

  _radiansToDegrees(rad) {
    return (rad * 360) / (Math.PI * 2);
  }

  _reset() {
    this._rotate({
      x: this.centerX,
      y: this.offsetTop + this.size
    });
  }

  _rotate(evt) {
    const radian = this._slopeToRadians(
      this.centerX,
      this.centerY,
      evt.x,
      evt.y
    );

    this.angle = this._radiansToDegrees(radian);

    const { x1, y1 } = this.defaultOrientation;
    this._needle.transform({
      rotation: this.angle - this._zeroOffset,
      cx: x1,
      cy: y1
    });

    this._sendValue(this.currentValue);
  }

  _setupEventListeners() {
    this._instance.on("mousedown", () => (this.isRotating = true));
    this._ctx.on("mouseup", () => (this.isRotating = false));

    this._instance.on("dblclick", () => this._reset());

    this._instance.on("mousemove", e => {
      if (!this.isRotating) return;
      this._rotate(e);
    });
  }

  _slopeToRadians(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
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

  get currentValue() {
    let value = this.angle - this._zeroOffset;

    if (value < 0) {
      value += 360;
    }

    return value;
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
