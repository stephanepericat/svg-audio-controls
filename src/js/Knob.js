import AudioControl from "./AudioControl";

export default class Knob extends AudioControl {
  constructor(...args) {
    super(...args);

    this.angle = 0;
    this.background = null;
    this.knob = null;
    this.needle = null;
  }

  append() {
    this.instance = this.ctx.group();
    this.instance.move(this.offsetLeft, this.offsetTop);

    this.background = this.instance.rect(this.size, this.size);
    this.background.fill(this.backgroundColor);

    this.knob = this.instance.circle(this.radius);
    this.knob.fill(this.fillColor);
    this.knob.stroke({ color: this.strokeColor, width: this.strokeWidth });
    this.knob.move(this.padding, this.padding);

    const { x1, y1, x2, y2 } = this.defaultOrientation;
    this.needle = this.instance.line(x1, y1, x2, y2);
    this.needle.stroke({
      color: this.needleColor,
      linecap: "round",
      width: this.strokeWidth
    });
  }

  /**
   * Getters
   */

  get backgroundColor() {
    return this.options.backgroundColor || "#ccc";
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
    return this.options.fillColor || "#fff";
  }

  get needleColor() {
    return this.options.needleColor || "#f00";
  }

  get offsetLeft() {
    return this.options.offsetLeft || 0;
  }

  get offsetTop() {
    return this.options.offsetTop || 0;
  }

  get padding() {
    return this.options.padding || 10;
  }

  get radius() {
    return this.options.radius || 50;
  }

  get size() {
    return this.radius + this.padding * 2;
  }

  get strokeColor() {
    return this.options.strokeColor || "#111";
  }

  get strokeWidth() {
    return this.options.strokeWidth || 5;
  }

  get zeroOffset() {
    return 90;
  }
}
