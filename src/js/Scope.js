import AudioControl from "./AudioControl";

/**
 * @class Scope
 * @extends AudioControl
 */
export default class Scope extends AudioControl {
  constructor(...args) {
    super(...args);

    this._scope = null;
    this._signal = null;
  }

  append() {
    this._createChild({ left: this.offsetLeft, top: this.offsetTop });
    this._createBackground({
      height: this.height * this.scale,
      width: this.width * this.scale,
      backgroundColor: this.backgroundColor
    });

    this._createGrid();
    this._createSignal();

    this._scale();
  }

  draw(coords) {
    this._signal.plot(coords);
  }

  _createGrid() {
    for (let i = 1; i < this.divisions; i++) {
      const left = (this.width / (this.divisions / this.scale)) * i;
      const top = (this.height / (this.divisions / this.scale)) * i;

      // vertical line
      this._instance.line(left, 0, left, this.height * this.scale).stroke({
        width: this.signalWidth / 2,
        color: this.gridColor
      });
      // horizontal line
      this._instance.line(0, top, this.width * this.scale, top).stroke({
        width: this.signalWidth / 2,
        color: this.gridColor
      });
    }
  }

  _createSignal() {
    this._signal = this._instance.polyline();
    this._signal.fill("none");
    this._signal.stroke({
      color: this.signalColor,
      linecap: "round",
      width: this.signalWidth
    });
  }

  _scale() {
    super._scale(this.height, this.width);
    this._instance.viewbox(...this.viewboxDimensions);
  }

  /**
   * Getters
   */

  get backgroundColor() {
    return this._options.backgroundColor || "#333";
  }

  get bufferLength() {
    return this._options.bufferLength || 512;
  }

  get divisions() {
    return this._options.divisions || 4;
  }

  get gridColor() {
    return this._options.gridColor || "#999";
  }

  get height() {
    return this.width / 2;
  }

  get scale() {
    return this.bufferLength / this.width;
  }

  get signalColor() {
    return this._options.signalColor || "cyan";
  }

  get signalWidth() {
    return this._options.signalWidth || 4;
  }

  get viewboxDimensions() {
    return [0, 0, this.width * this.scale, this.height * this.scale];
  }

  get width() {
    return this._options.width || this.bufferLength / 2;
  }
}
