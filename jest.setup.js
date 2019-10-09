global.SVGContext = {
  group: jest.fn((...args) => {
    return {
      circle: jest.fn(() => {
        return {
          fill: jest.fn(),
          move: jest.fn(),
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
          animate: jest.fn(),
          fill: jest.fn(() => {
            return {
              move: jest.fn()
            };
          }),
          move: jest.fn()
        };
      })
    };
  }),
  on: jest.fn()
};
