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

  _render() {
    if (!this.channels) {
      throw new Error("AudioBuffer has no channels");
    }

    console.log("WAVEFORM DATA >>>", this.waveFormData);
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

  get backgroundColor() {
    return this._options.backgroundColor || "#111";
  }

  get channels() {
    return this._audioData ? this._audioData.numberOfChannels : 0;
  }

  get height() {
    return this._options.height || 80;
  }

  get length() {
    return this._audioData ? this._audioData.length : 0;
  }

  get sampleRate() {
    return this._audioData ? this._audioData.sampleRate : 0;
  }

  get size() {
    return Math.ceil(this.length / this.width);
  }

  get waveFormColor() {
    return this._options.waveFormColor || "#f70";
  }

  get waveFormData() {
    return this.audioData ? this._getAverages(this.audioData) : [];
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
    this._render();
  }
}
