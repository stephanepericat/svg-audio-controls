import Button from "./Button";

/**
 * @class Led
 * @extends Button
 */
export default class Led extends Button {
  toggle() {
    this._toggle();
  }

  _setupEventListeners() {
    return false;
  }

  /**
   * Setters
   */

  set highlightColor(value) {
    this._options.activeColor = value;
    if (this.isOn) {
      this._button.animate(100).fill(value);
    }
  }
}
