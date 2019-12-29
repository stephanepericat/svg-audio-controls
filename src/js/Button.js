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
    this._createChild({ left: this.offsetLeft, top: this.offsetTop });
    this._createBackground({
      width: this.size,
      height: this.size,
      backgroundColor: this.backgroundColor
    });

    this._createButton();
    this._deactivate(false);
    this._scale(this.size, this.size);
    this._setupEventListeners();
  }

  _activate() {
    this.isOn = true;
    this._button.animate(50).fill(this.activeColor);
    this._sendValue(1);
  }

  _createButton() {
    this._button = this._instance.circle(this.radius);
    this._button.stroke({ width: this.strokeWidth, color: this.strokeColor });
    this._button.move(this.padding, this.padding);
  }

  _deactivate(animate = true) {
    this.isOn = false;
    if (animate) {
      this._button.animate(50).fill(this.fillColor);
      return !this.isTemporary ? this._sendValue(0) : null;
    }

    this._button.fill(this.fillColor);
  }

  _onClick() {
    return this.isTemporary ? this._trigger() : this._toggle();
  }

  _setupEventListeners() {
    this._button.on("click", () => this._onClick());
  }

  _toggle() {
    return this.isOn ? this._deactivate() : this._activate();
  }

  _trigger() {
    this._activate();
    setTimeout(() => this._deactivate(), 50);
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

  get isTemporary() {
    return this._options.temporary || false;
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

  set isOn(value) {
    this._on = value;
  }
}
