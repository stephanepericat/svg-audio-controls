/**
 * @class AudioControl
 */
export default class AudioControl {
  constructor(ctx = null, options = {}) {
    this._ctx = ctx;
    this._options = options;
    this._instance = null;
  }
}
