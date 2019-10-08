import AudioControl from "./AudioControl";

export default class Knob extends AudioControl {
  append() {
    console.log("KNOB", this);
  }

  /**
   * Getters
   */

  get backgroundColor() {
    return this.options.backgroundColor || "#ccc";
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
