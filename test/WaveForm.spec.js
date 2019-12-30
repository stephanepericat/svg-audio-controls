import WaveForm from "../src/js/WaveForm";
import "jasmine-expect";

describe("WaveForm > constructor", () => {
  it("should extend AudioControl", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);

    expect(instance._audioData).toBe(null);
  });
});

describe("WaveForm > methods > append", () => {
  it("should create a display", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    const createChildMock = jest.fn();
    const createBackgroundMock = jest.fn();
    const scaleMock = jest.fn();
    instance._createChild = createChildMock;
    instance._createBackground = createBackgroundMock;
    instance._scale = scaleMock;

    instance.append();

    expect(createChildMock).toHaveBeenCalledWith({ left: 0, top: 0 });
    expect(createBackgroundMock).toHaveBeenCalledWith({
      backgroundColor: "#111",
      height: 80,
      width: 320
    });
    expect(scaleMock).toHaveBeenCalledWith(80, 320);
  });
});

describe("WaveForm > methods > _drawFrame", () => {
  it("should draw a line", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    const stroke = jest.fn();
    const line = jest.fn(() => ({ stroke }));
    instance._instance = { line };

    const frame = [0, 1, 0, 3];
    const color = "#ff0";
    const width = 2;
    instance._drawFrame(frame, color, width);
    expect(line).toHaveBeenCalledWith(...frame);
    expect(stroke).toHaveBeenCalledWith({ color, width });
  });

  it("should use a default width of 1", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    const stroke = jest.fn();
    const line = jest.fn(() => ({ stroke }));
    instance._instance = { line };

    const frame = [0, 1, 0, 3];
    const color = "#ff0";
    instance._drawFrame(frame, color);
    expect(stroke).toHaveBeenCalledWith({ color, width: 1 });
  });
});

describe("WaveForm > methods > _drawMedianLine", () => {
  it("should draw a median line", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    const drawFrameMock = jest.fn();
    instance._drawFrame = drawFrameMock;

    instance._drawMedianLine();

    expect(drawFrameMock).toHaveBeenCalledWith([0, 40, 320, 40], "#fff", 1);
  });
});

describe("WaveForm > methods > _drawShadow", () => {
  it("should draw a shadow", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    instance.append();

    instance._drawShadow();

    expect(instance._instance.rect).toHaveBeenCalled();
  });
});

describe("WaveForm > methods > _getAverages", () => {
  it("should get an array of average data", () => {
    const options = { width: 22050 };
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    instance.append();
    const b = [1, 2, 3, 4, 5, 6];
    const c = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    const getDataMock = jest.fn(() => b);
    const splitByMock = jest.fn(() => c);
    instance._getData = getDataMock;
    instance._splitBy = splitByMock;
    instance.audioData = new AudioBuffer();

    const avg = instance._getAverages(b);

    expect(getDataMock).toHaveBeenCalledWith(b);
    expect(splitByMock).toHaveBeenCalledWith(2, b);
    expect(avg).toEqual([
      [1, 3],
      [4, 6]
    ]);
  });
});

describe("WaveForm > methods > _getData", () => {
  it("should get daat from an audio buffer", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    const b = new AudioBuffer();

    const data = instance._getData(b, 1);

    expect(data).toBeArrayOfSize(44100);
  });

  it("should get data from channel 0 by default", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    const b = {
      getChannelData: jest.fn()
    };

    const data = instance._getData(b);

    expect(b.getChannelData).toHaveBeenCalledWith(0);
  });
});

describe("WaveForm > methods > _getFrame", () => {
  it("should compute a frame coordinates", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);

    const frame = [-2, 2];
    const xPosition = 42;
    const coordinates = instance._getFrame(frame, xPosition);

    expect(coordinates).toEqual([xPosition, 120, xPosition, -40]);
  });
});

describe("WaveForm > methods > _getFrames", () => {
  it("should call '_getFrame()' on each frame", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);
    const getFrameMock = jest.fn();
    instance._getFrame = getFrameMock;

    const data = [[-2, 2]];
    instance._getFrames(data);

    expect(getFrameMock).toHaveBeenCalledWith(data[0], 0, data);
  });
});

describe("WaveForm > methods > _render", () => {
  it("should render a waveform", () => {
    const options = {};
    const ctx = global.SVGContext;

    const data = [-2, 2, 3, 4];
    const avg = [[-2, 2]];
    const coords = [[0, 2, 0, -2]];

    const instance = new WaveForm(ctx, options);
    const getFramesMock = jest.fn(() => coords);
    const getAveragesMock = jest.fn(() => avg);
    const drawFrameMock = jest.fn();
    instance._getFrames = getFramesMock;
    instance._getAverages = getAveragesMock;
    instance._drawFrame = drawFrameMock;

    instance._render(data);

    expect(getAveragesMock).toHaveBeenCalledWith(data);
    expect(getFramesMock).toHaveBeenCalledWith(avg);
    expect(drawFrameMock).toHaveBeenCalledWith(
      coords[0],
      instance.waveFormColor
    );
  });

  it("should render a shadow, if enabled", () => {
    const options = { hasShadow: true };
    const ctx = global.SVGContext;

    const data = [-2, 2, 3, 4];
    const avg = [[-2, 2]];
    const coords = [[0, 2, 0, -2]];

    const instance = new WaveForm(ctx, options);
    const drawMedianLineMock = jest.fn();
    const drawShadowMock = jest.fn();
    instance._getFrames = jest.fn(() => coords);
    instance._getAverages = jest.fn(() => avg);
    instance._drawFrame = jest.fn();
    instance._drawMedianLine = drawMedianLineMock;
    instance._drawShadow = drawShadowMock;

    instance._render(data);

    expect(drawMedianLineMock).toHaveBeenCalled();
    expect(drawShadowMock).toHaveBeenCalled();
  });
});

describe("WaveForm > methods > _splitBy", () => {
  it("should create sub arrays", () => {
    const options = {};
    const ctx = global.SVGContext;

    const instance = new WaveForm(ctx, options);

    const data = [-1, 2, 3, -4, -3, 5];
    const s = instance._splitBy(2, data);

    expect(s).toEqual([
      [-1, 2],
      [3, -4],
      [-3, 5]
    ]);
  });
});

describe("WaveForm > Getters", () => {
  test("audioData", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.audioData).toBe(null);
  });

  test("audioLength", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);
    w._render = jest.fn();
    w.audioData = new AudioBuffer();

    expect(w.audioLength).toEqual(44100);
  });

  test("audioLength > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.audioLength).toEqual(0);
  });

  test("backgroundColor", () => {
    const options = { backgroundColor: "#f00" };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.backgroundColor).toEqual(options.backgroundColor);
  });

  test("backgroundColor > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.backgroundColor).toEqual("#111");
  });

  test("channels", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);
    w._render = jest.fn();
    w.audioData = new AudioBuffer();

    expect(w.channels).toEqual(1);
  });

  test("channels > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.channels).toEqual(0);
  });

  test("hasShadow", () => {
    const options = { hasShadow: true };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.hasShadow).toBeTruthy();
  });

  test("hasShadow > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.hasShadow).toBeFalsy();
  });

  test("height", () => {
    const options = { height: 42 };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.height).toEqual(options.height);
  });

  test("height > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.height).toEqual(80);
  });

  test("median", () => {
    const options = { height: 42 };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.median).toEqual(options.height / 2);
  });

  test("sampleRate", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);
    w._render = jest.fn();
    w.audioData = new AudioBuffer();

    expect(w.sampleRate).toEqual(44100);
  });

  test("sampleRate > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.sampleRate).toEqual(0);
  });

  test("shadowColor", () => {
    const options = { shadowColor: "#f00" };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.shadowColor).toEqual(options.shadowColor);
  });

  test("shadowColor > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.shadowColor).toEqual("#fff");
  });

  test("shadowOpacity", () => {
    const options = { shadowOpacity: 0.42 };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.shadowOpacity).toEqual(options.shadowOpacity);
  });

  test("shadowOpacity > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.shadowOpacity).toEqual(0.25);
  });

  test("size", () => {
    const options = { width: 400 };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);
    w._render = jest.fn();
    w.audioData = new AudioBuffer();

    expect(w.size).toEqual(Math.ceil(44100 / options.width));
  });

  test("waveFormColor", () => {
    const options = { waveFormColor: "#f00" };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.waveFormColor).toEqual(options.waveFormColor);
  });

  test("waveFormColor > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.waveFormColor).toEqual("#f70");
  });

  test("width", () => {
    const options = { width: 400 };
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.width).toEqual(options.width);
  });

  test("width > default", () => {
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(w.width).toEqual(320);
  });
});

describe("WaveForm > Setters > audioData", () => {
  it("should store and render an AudioBuffer", () => {
    const b = new AudioBuffer();
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);
    const renderMock = jest.fn();
    w._render = renderMock;

    w.audioData = b;

    expect(renderMock).toHaveBeenCalledWith(b);
  });

  it("should throw an error if the data is not an AudioBuffer", () => {
    const b = {};
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);

    expect(() => (w.audioData = b)).toThrow(
      new Error("Data is not an AudioBuffer")
    );
  });
});
