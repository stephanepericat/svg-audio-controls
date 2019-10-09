global.SVG = {
  group: jest.fn((...args) => {
    return {
      circle: jest.fn(),
      line: jest.fn(),
      move: jest.fn(),
      on: jest.fn(),
      rect: jest.fn()
    };
  })
};
