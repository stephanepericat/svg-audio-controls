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
      height: this.height * 2,
      width: this.width * 2,
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
    for (let i = 1; i < 4; i++) {
      const left = (this.width / 2) * i;
      const top = (this.height / 2) * i;

      // vertical line
      this._instance
        .line(left, 0, left, this.height * 2)
        .stroke({ width: this.signalWidth / 2, color: this.gridColor });
      // horizontal line
      this._instance
        .line(0, top, this.width * 2, top)
        .stroke({ width: this.signalWidth / 2, color: this.gridColor });
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
    this._instance.attr({ height: this.height, width: this.width });
    this._instance.style("overflow", "hidden");
    this._instance.viewbox(...this.viewboxDimensions);
  }

  /**
   * Getters
   */

  get backgroundColor() {
    return this._options.backgroundColor || "#333";
  }

  get gridColor() {
    return this._options.gridColor || "#999";
  }

  get height() {
    return this._options.height || 130;
  }

  get signalColor() {
    return this._options.signalColor || "cyan";
  }

  get signalWidth() {
    return this._options.signalWidth || 4;
  }

  get viewboxDimensions() {
    return [0, 0, this.width * 2, this.height * 2];
  }

  get width() {
    return this._options.width || 258;
  }
}
