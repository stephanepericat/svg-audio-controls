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
