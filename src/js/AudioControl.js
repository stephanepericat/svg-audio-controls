/**
 * @class AudioControl
 */
export default class AudioControl {
  constructor(ctx = null, options = {}) {
    this._ctx = ctx;
    this._options = options;
    this._instance = null;
    this._background = null;
  }

  _createBackground({ width = 20, height = 20, backgroundColor = "#fff" }) {
    if (!this._instance) return;
    this._background = this._instance.rect(width, height);
    this._background.fill(backgroundColor);
    return this._background;
  }

  _createChild({ left = 0, top = 0 } = {}) {
    this._createGroup({ left, top }, true);
  }

  _createGroup({ left = 0, top = 0 } = {}, nested = false) {
    this._instance = nested ? this._ctx.nested() : this._ctx.group();
    this._instance.move(left, top);
    return this._instance;
  }

  _sendValue(value) {
    /* istanbul ignore if */
    if (!this._instance) return;
    this._instance.fire("valueChange", { value });
  }

  _scale(height, width) {
    this._instance.attr({ height, width });
    this._instance.style("overflow", "hidden");
  }

  /**
   * Getters
   */

  get padding() {
    return this._options.padding || 10;
  }

  get offsetLeft() {
    return this._options.offsetLeft || 0;
  }

  get offsetTop() {
    return this._options.offsetTop || 0;
  }

  /**
   * Setters
   */

  set onValueChange(callback) {
    this._instance.on("valueChange", callback);
  }
}
