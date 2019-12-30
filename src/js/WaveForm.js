import AudioControl from "./AudioControl";

/**
 * @class WaveForm
 * @extends AudioControl
 */
export default class WaveForm extends AudioControl {
  constructor(...args) {
    super(...args);

    this._audioData = null;
    this._waveForm = null;
  }

  append() {
    this._createChild({ left: this.offsetLeft, top: this.offsetTop });
    this._createBackground({
      height: this.height,
      width: this.width,
      backgroundColor: this.backgroundColor
    });
    this._scale(this.height, this.width);
  }

  /**
   * Private methods
   */

  _drawFrame(frame, color, width = 1) {
    this._instance.line(...frame).stroke({ width, color });
  }

  _drawMedianLine() {
    const frame = [0, this.median, this.width, this.median];
    this._drawFrame(frame, this.shadowColor, 1);
  }

  _drawShadow() {
    this._instance
      .rect(this.width, this.median)
      .move(0, this.median)
      .attr({
        fill: this.shadowColor,
        "fill-opacity": this.shadowOpacity
      });
  }

  _getAverages(buffer) {
    const d = this._getData(buffer);
    const chunks = this._splitBy(this.size, d);
    return chunks.map(c => [Math.min(...c), Math.max(...c)]);
  }

  _getData(buffer, channel = 0) {
    /**
     * values are between -1.0 and 1.0
     */
    return buffer.getChannelData(channel);
  }

  _getFrame(frame, xPosition) {
    const [min, max] = frame;
    const y1 = this.median - Math.ceil(min * this.median);
    const y2 = this.median - Math.floor(max * this.median);
    return [xPosition, y1, xPosition, y2];
  }

  _getFrames(waveFormData) {
    return waveFormData.map(this._getFrame.bind(this));
  }

  _render(data) {
    const waveFormData = this._getAverages(data);
    const frames = this._getFrames(waveFormData);
    frames.forEach(f => this._drawFrame(f, this.waveFormColor));
    if (this.hasShadow) {
      this._drawMedianLine();
      this._drawShadow();
    }
  }

  _splitBy(size, list) {
    return list.reduce((acc, curr, i, self) => {
      if (!(i % size)) {
        return [...acc, self.slice(i, i + size)];
      }
      return acc;
    }, []);
  }

  /**
   * Getters
   */

  get audioData() {
    return this._audioData;
  }

  get audioLength() {
    return this._audioData ? this._audioData.length : 0;
  }

  get backgroundColor() {
    return this._options.backgroundColor || "#111";
  }

  get channels() {
    return this._audioData ? this._audioData.numberOfChannels : 0;
  }

  get hasShadow() {
    return this._options.hasShadow || false;
  }

  get height() {
    return this._options.height || 80;
  }

  get median() {
    return this.height / 2;
  }

  get sampleRate() {
    return this._audioData ? this._audioData.sampleRate : 0;
  }

  get shadowColor() {
    return this._options.shadowColor || "#fff";
  }

  get shadowOpacity() {
    return this._options.shadowOpacity || 0.25;
  }

  get size() {
    return Math.ceil(this.audioLength / this.width);
  }

  get waveFormColor() {
    return this._options.waveFormColor || "#f70";
  }

  get width() {
    return this._options.width || 320;
  }

  /**
   * Setters
   */

  set audioData(data) {
    const isAudioBuffer = !!(data instanceof AudioBuffer);
    if (!isAudioBuffer) {
      throw new Error("Data is not an AudioBuffer");
    }

    this._audioData = data;
    this._render(this._audioData);
  }
}
