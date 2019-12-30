const RATE = 44100;

export default class MockBuffer {
  constructor() {}

  getChannelData() {
    const data = [];

    for (let i = 0; i < this.length; i++) {
      data.push((Math.random() - 0.5) * 2);
    }

    return data;
  }

  get sampleRate() {
    return RATE;
  }

  get length() {
    return RATE * 2;
  }

  get duration() {
    return this.length / this.sampleRate;
  }
}
