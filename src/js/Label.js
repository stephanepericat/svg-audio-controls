import AudioControl from "./AudioControl";

/**
 * @class Label
 * @extends AudioControl
 */
export default class Label extends AudioControl {
  constructor(...args) {
    super(...args);

    this._value = null;
    this._label = null;
  }

  append() {
    this._createChild({ left: this.offsetLeft, top: this.offsetTop });
    this._createLabel();
  }

  _addSpan(add, value) {
    add.tspan(value.toString()).attr({ "text-anchor": "middle" });
  }

  _createLabel() {
    this._label = this._instance.text("");
    this._label.font({
      family: this.fontFamily,
      size: this.fontSize
    });
    this._label.fill(this.fontColor);

    this._setText(this.defaultText);
  }

  _setText(value) {
    this._label.text(add => this._addSpan(add, value));
  }

  /**
   * Getters
   */
  get defaultText() {
    return this._options.defaultText
      ? this._options.defaultText.toString()
      : "";
  }

  get fontColor() {
    return this._options.fontColor || "#000";
  }

  get fontFamily() {
    return this._options.fontFamily || "Helvetica, Arial, sans-serif";
  }

  get fontSize() {
    return this._options.fontSize || 16;
  }

  get value() {
    return this._value;
  }

  /**
   * Setters
   */
  set value(value) {
    this._value = value;
    this._setText(value);
  }
}
