import AudioControl from "./AudioControl";

/**
 * @class Switch
 * @extends AudioControl
 */
export default class Switch extends AudioControl {
  constructor(...args) {
    super(...args);

    this._selected = 0;
  }

  append() {}

  /**
   * Getters
   */
  get backgroundColor() {
    return this._options.backgroundColor || "#151515";
  }

  get currentSelection() {
    return this._selected;
  }

  get isHorizontal() {
    return this._options.isHorizontal || false;
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

  get size() {
    return this._options.size || 20;
  }

  get stepsAmount() {
    return this._options.steps || 2;
  }

  get strokeColor() {
    return this._options.strokeColor || "#ccc";
  }

  get switchColor() {
    return this._options.switchColor || "#666";
  }

  /**
   * Setters
   */
  onChange(callback) {
    this._instance.on("valueChange", callback);
  }
}
