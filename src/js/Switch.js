import AudioControl from "./AudioControl";

/**
 * @class Switch
 * @extends AudioControl
 */
export default class Switch extends AudioControl {
  constructor(...args) {
    super(...args);

    this._selected = 0;
    this._switch = null;
  }

  append() {
    const { width, height } = this._getDimensions();

    this._createChild({ left: this.offsetLeft, top: this.offsetTop });
    this._createBackground({
      width,
      height,
      backgroundColor: this.backgroundColor
    }).stroke({
      color: this.strokeColor,
      width: this.borderWidth
    });
    this._createSwitch();
    this._scale(height + this.borderWidth * 2, width + this.borderWidth * 2);
    this._setupEventListeners();
  }

  /**
   * Private methods
   */
  _createBackground(...args) {
    super._createBackground(...args);
    this._background.move(this.borderWidth, this.borderWidth);
    return this._background;
  }

  _createSwitch() {
    this._switch = this._instance.rect(
      this.size - this.borderWidth,
      this.size - this.borderWidth
    );
    this._switch.fill(this.switchColor);
    this._moveSwitch(
      {
        left: this.switchOffset,
        top: this.switchOffset
      },
      false
    );
  }

  _getDimensions() {
    const width = this.isHorizontal ? this.size * this.stepsAmount : this.size;
    const height = this.isHorizontal ? this.size : this.size * this.stepsAmount;

    return { width, height };
  }

  _moveSwitch({ left = 0, top = 0 }, animate = true) {
    if (animate) {
      return this._switch.animate(100).move(left, top);
    }
    this._switch.move(left, top);
  }

  _setupEventListeners() {
    this._instance.on("click", () => this._updateSelection());
  }

  _updateSelection() {
    this.currentSelection =
      this.currentSelection === this.stepsAmount - 1
        ? 0
        : this.currentSelection + 1;

    const left = this.isHorizontal
      ? this.switchOffset + this.size * this.currentSelection
      : this.switchOffset;
    const top = this.isHorizontal
      ? this.switchOffset
      : this.switchOffset + this.size * this.currentSelection;

    this._moveSwitch({ left, top });
    this._sendValue(this.currentSelection);
  }

  /**
   * Getters
   */
  get backgroundColor() {
    return this._options.backgroundColor || "#151515";
  }

  get borderWidth() {
    return this.size / 5;
  }

  get currentSelection() {
    return this._selected;
  }

  get isHorizontal() {
    return this._options.isHorizontal || false;
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

  get switchOffset() {
    return this.borderWidth * 1.5;
  }

  /**
   * Setters
   */

  set currentSelection(value) {
    this._selected = value;
  }
}
