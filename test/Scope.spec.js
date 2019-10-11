import Scope from "../src/js/Scope";

describe("Scope > constructor", () => {
  it("should extend AudioControl", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Scope(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Scope(ctx, options);

    expect(instance._scope).toBe(null);
    expect(instance._signal).toBe(null);
  });
});

describe("Scope > Getters", () => {
  // test("angle", () => {
  //   const instance = new Knob();
  //   expect(instance.angle).toEqual(0);
  // });

  test("backgroundColor", () => {
    const backgroundColor = "#ff0";
    const instance = new Scope({}, { backgroundColor });
    expect(instance.backgroundColor).toEqual(backgroundColor);
  });

  test("backgroundColor > default", () => {
    const instance = new Scope();
    expect(instance.backgroundColor).toEqual("#333");
  });

  test("divisions", () => {
    const divisions = 5;
    const instance = new Scope({}, { divisions });
    expect(instance.divisions).toEqual(divisions);
  });

  test("divisions > default", () => {
    const instance = new Scope();
    expect(instance.divisions).toEqual(4);
  });

  test("gridColor", () => {
    const gridColor = "#ff0";
    const instance = new Scope({}, { gridColor });
    expect(instance.gridColor).toEqual(gridColor);
  });

  test("gridColor > default", () => {
    const instance = new Scope();
    expect(instance.gridColor).toEqual("#999");
  });

  test("height", () => {
    const width = 200;
    const instance = new Scope({}, { width });
    expect(instance.height).toEqual(width / 2);
  });

  test("scale", () => {
    const width = 200;
    const instance = new Scope({}, { width });
    expect(instance.scale).toEqual(instance.bufferLength / width);
  });

  test("signalColor", () => {
    const signalColor = "#ff0";
    const instance = new Scope({}, { signalColor });
    expect(instance.signalColor).toEqual(signalColor);
  });

  test("signalColor > default", () => {
    const instance = new Scope();
    expect(instance.signalColor).toEqual("cyan");
  });

  test("signalWidth", () => {
    const signalWidth = 5;
    const instance = new Scope({}, { signalWidth });
    expect(instance.signalWidth).toEqual(signalWidth);
  });

  test("signalWidth > default", () => {
    const instance = new Scope();
    expect(instance.signalWidth).toEqual(4);
  });

  test("viewboxDimensions", () => {
    const width = 200;
    const instance = new Scope({}, { width });
    expect(instance.viewboxDimensions).toEqual([
      0,
      0,
      instance.bufferLength,
      instance.height * instance.scale
    ]);
  });

  test("width", () => {
    const width = 5;
    const instance = new Scope({}, { width });
    expect(instance.width).toEqual(width);
  });

  test("width > default", () => {
    const instance = new Scope();
    expect(instance.width).toEqual(instance.bufferLength / 2);
  });
});

describe("Scope > append", () => {
  it("should create the Scope interface", () => {
    const ctx = global.SVGContext;
    const instance = new Scope(ctx, {});
    instance._createChild = jest.fn();
    instance._createBackground = jest.fn();
    instance._createGrid = jest.fn();
    instance._createSignal = jest.fn();
    instance._scale = jest.fn();

    instance.append();

    expect(instance._createChild).toHaveBeenCalled();
    expect(instance._createBackground).toHaveBeenCalled();
    expect(instance._createGrid).toHaveBeenCalled();
    expect(instance._createSignal).toHaveBeenCalled();
    expect(instance._scale).toHaveBeenCalled();
  });
});

describe("Scope > draw", () => {
  it("should draw the signal on the scope", () => {
    const ctx = global.SVGContext;
    const points = [[0, 0], [1, 255]];
    const instance = new Scope(ctx, {});
    instance._signal = { plot: jest.fn() };

    instance.draw(points);

    expect(instance._signal.plot).toHaveBeenCalledWith(points);
  });
});

describe("Scope > _createGrid", () => {
  it("should draw some grid on the background", () => {
    const ctx = global.SVGContext;
    const divisions = 6;
    const instance = new Scope(ctx, { divisions });
    instance._instance = ctx.nested();
    instance._createGrid();

    expect(instance._instance.line).toHaveBeenCalledTimes((divisions - 1) * 2);
  });
});

describe("Scope > _createSignal", () => {
  it("should create the signal line", () => {
    const ctx = global.SVGContext;
    const divisions = 6;
    const instance = new Scope(ctx, { divisions });
    instance._instance = ctx.nested();

    instance._createSignal();
    expect(instance._instance.polyline).toHaveBeenCalled();
  });
});

describe("Scope > _scale", () => {
  it("should scale the viewbox", () => {
    const ctx = global.SVGContext;
    const width = 200;
    const instance = new Scope(ctx, { width });
    instance._instance = ctx.nested();

    instance._scale();
    expect(instance._instance.attr).toHaveBeenCalledWith({
      height: width / 2,
      width
    });
    expect(instance._instance.style).toHaveBeenCalledWith("overflow", "hidden");
    expect(instance._instance.viewbox).toHaveBeenCalledWith(
      ...instance.viewboxDimensions
    );
  });
});
