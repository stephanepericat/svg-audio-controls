import AudioControl from "./AudioControl";

/**
 * @class Button
 * @extends AudioControl
 */
export default class Button extends AudioControl {
  constructor(...args) {
    super(...args);

    this._on = false;
    this._button = null;
  }

  append() {
    this._createGroup({ left: this.offsetLeft, top: this.offsetTop });
    this._createBackground({
      width: this.size,
      height: this.size,
      backgroundColor: this.backgroundColor
    });

    this._button = this._instance.circle(this.radius);
    this._button.stroke({ width: this.strokeWidth, color: this.strokeColor });
    this._button.move(this.padding, this.padding);

    this._setButtonColor(this.fillColor);
    this._setupEventListeners();
  }

  _onClick() {
    console.log("ON CLICK");
    return this.isTemporary ? this._trigger() : this._toggle();
  }

  _setButtonColor(color) {
    this._button.fill(color);
  }

  _setupEventListeners() {
    this._button.on("click", () => this._onClick());
  }

  _toggle() {
    console.log("TOGGLE", this.isOn);
  }

  _trigger() {
    console.log("TRIGGER", this.isOn);
  }

  /**
   * Getters
   */

  get activeColor() {
    return this._options.activeColor || "#f00";
  }

  get backgroundColor() {
    return this._options.backgroundColor || "#fff";
  }

  get fillColor() {
    return this._options.fillColor || "#ccc";
  }

  get isOn() {
    return this._on;
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

  get isTemporary() {
    return this._options.temporary || false;
  }

  /**
   * Setters
   */

  set isOn(value) {
    this._on = value;
  }
}
