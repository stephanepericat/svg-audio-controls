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
  }

  _createGroup({ left = 0, top = 0 } = {}) {
    this._instance = this._ctx.group();
    this._instance.move(left, top);
  }

  _sendValue(value) {
    /* istanbul ignore if */
    if (!this._instance) return;
    this._instance.fire("valueChange", { value });
  }
}
