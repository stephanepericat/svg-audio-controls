global.SVGContext = {
  group: jest.fn((...args) => {
    return {
      circle: jest.fn(() => {
        return {
          animate: jest.fn(() => {
            return {
              fill: jest.fn()
            };
          }),
          fill: jest.fn(),
          move: jest.fn(),
          on: jest.fn(),
          stroke: jest.fn()
        };
      }),
      fire: jest.fn(),
      line: jest.fn(() => {
        return {
          stroke: jest.fn(),
          transform: jest.fn()
        };
      }),
      move: jest.fn(),
      on: jest.fn(),
      rect: jest.fn(() => {
        return {
          animate: jest.fn(() => {
            return {
              move: jest.fn()
            };
          }),
          fill: jest.fn(() => {
            return {
              move: jest.fn()
            };
          }),
          move: jest.fn(),
          stroke: jest.fn()
        };
      }),
      text: jest.fn(() => {
        return {
          fill: jest.fn(),
          font: jest.fn(),
          move: jest.fn(),
          text: jest.fn()
        };
      })
    };
  }),
  nested: jest.fn(() => {
    return {
      attr: jest.fn(),
      line: jest.fn(() => {
        return {
          stroke: jest.fn()
        };
      }),
      move: jest.fn(),
      polyline: jest.fn(() => {
        return {
          fill: jest.fn(),
          stroke: jest.fn()
        };
      }),
      rect: jest.fn(() => {
        return {
          fill: jest.fn(),
          move: jest.fn(() => {
            return {
              attr: jest.fn()
            };
          })
        };
      }),
      style: jest.fn(),
      viewbox: jest.fn()
    };
  }),
  on: jest.fn()
};

// AUDIOBUFFER MOCK
const RATE = 44100;

function AudioBuffer() {}

AudioBuffer.prototype.getChannelData = function() {
  const data = [];

  for (let i = 0; i < RATE; i++) {
    data.push((Math.random() - 0.5) * 2);
  }

  return data;
};

AudioBuffer.prototype.sampleRate = RATE;
AudioBuffer.prototype.length = RATE;
AudioBuffer.prototype.duration = 1.0;
AudioBuffer.prototype.numberOfChannels = 1;

global.AudioBuffer = AudioBuffer;
