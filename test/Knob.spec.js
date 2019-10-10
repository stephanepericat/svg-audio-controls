import Knob from "../src/js/Knob";

describe("Knob > constructor", () => {
  it("should extend AudioControl", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Knob(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Knob(ctx, options);

    expect(instance._angle).toEqual(0);
    expect(instance._rotating).toBe(false);
    expect(instance._zeroOffset).toEqual(90);
  });
});

describe("Knob > Getters", () => {
  test("angle", () => {
    const instance = new Knob();
    expect(instance.angle).toEqual(0);
  });

  test("backgroundColor", () => {
    const backgroundColor = "#ff0";
    const instance = new Knob({}, { backgroundColor });
    expect(instance.backgroundColor).toEqual(backgroundColor);
  });

  test("backgroundColor > default", () => {
    const instance = new Knob();
    expect(instance.backgroundColor).toEqual("#fff");
  });

  test("centerX", () => {
    const instance = new Knob();
    expect(instance.centerX).toEqual(35);
  });

  test("centerY", () => {
    const instance = new Knob();
    expect(instance.centerY).toEqual(35);
  });

  test("currentValue > angle === 0", () => {
    const instance = new Knob();
    expect(instance.currentValue).toEqual(0);
  });

  test("currentValue > value > 0", () => {
    const instance = new Knob();
    instance._angle = 150;
    expect(instance.currentValue).toEqual(60);
  });

  test("currentValue > value < 0", () => {
    const instance = new Knob();
    instance._angle = 50;
    expect(instance.currentValue).toEqual(320);
  });

  test("defaultOrientation", () => {
    const instance = new Knob();
    expect(instance.defaultOrientation).toEqual({
      x1: 35,
      x2: 35,
      y1: 35,
      y2: 62.5
    });
  });

  test("fillColor", () => {
    const fillColor = "#ff0";
    const instance = new Knob({}, { fillColor });
    expect(instance.fillColor).toEqual(fillColor);
  });

  test("fillColor > default", () => {
    const instance = new Knob();
    expect(instance.fillColor).toEqual("#ccc");
  });

  test("isRotating", () => {
    const instance = new Knob();
    expect(instance.isRotating).toEqual(false);
  });

  test("needleColor", () => {
    const needleColor = "#ff0";
    const instance = new Knob({}, { needleColor });
    expect(instance.needleColor).toEqual(needleColor);
  });

  test("needleColor > default", () => {
    const instance = new Knob();
    expect(instance.needleColor).toEqual("#f70");
  });

  test("radius", () => {
    const radius = 20;
    const instance = new Knob({}, { radius });
    expect(instance.radius).toEqual(radius);
  });

  test("radius > default", () => {
    const instance = new Knob();
    expect(instance.radius).toEqual(50);
  });

  test("size", () => {
    const instance = new Knob();
    expect(instance.size).toEqual(70);
  });

  test("strokeColor", () => {
    const strokeColor = "#ff0";
    const instance = new Knob({}, { strokeColor });
    expect(instance.strokeColor).toEqual(strokeColor);
  });

  test("strokeColor > default", () => {
    const instance = new Knob();
    expect(instance.strokeColor).toEqual("#333");
  });

  test("strokeWidth", () => {
    const strokeWidth = 10;
    const instance = new Knob({}, { strokeWidth });
    expect(instance.strokeWidth).toEqual(strokeWidth);
  });

  test("strokeWidth > default", () => {
    const instance = new Knob();
    expect(instance.strokeWidth).toEqual(5);
  });
});

describe("Knobs > Setters", () => {
  test("angle", () => {
    const instance = new Knob();
    const angle = 25;
    instance.angle = angle;
    expect(instance._angle).toEqual(angle);
  });

  test("isRotating", () => {
    const instance = new Knob();
    const rotating = true;
    instance.isRotating = rotating;
    expect(instance._rotating).toEqual(rotating);
  });
});

describe("Knob > append", () => {
  it("should create the knob interface", () => {
    const instance = new Knob();
    instance._createGroup = jest.fn();
    instance._createBackground = jest.fn();
    instance._createKnob = jest.fn();
    instance._createNeedle = jest.fn();
    instance._setupEventListeners = jest.fn();

    instance.append();

    expect(instance._createGroup).toHaveBeenCalled();
    expect(instance._createBackground).toHaveBeenCalled();
    expect(instance._createKnob).toHaveBeenCalled();
    expect(instance._createNeedle).toHaveBeenCalled();
    expect(instance._setupEventListeners).toHaveBeenCalled();
  });
});

describe("Knob > _calculateSlope", () => {
  it("should calculate the slope of the needle", () => {
    const instance = new Knob();
    const x1 = 2,
      y1 = 3,
      x2 = 5,
      y2 = 7;

    const slope = instance._calculcateSlope(x1, y1, x2, y2);
    expect(slope).toEqual(1.3333333333333333);
  });
});

describe("Knob > _createKnob", () => {
  it("should create a circle", () => {
    const ctx = global.SVGContext;
    const instance = new Knob();
    instance._instance = ctx.group();

    instance._createKnob();

    expect(instance._instance.circle).toHaveBeenCalledWith(50);
  });
});

describe("Knob > _createNeedle", () => {
  it("should create a line", () => {
    const ctx = global.SVGContext;
    const instance = new Knob();
    instance._instance = ctx.group();

    instance._createNeedle();

    expect(instance._instance.line).toHaveBeenCalledWith(35, 35, 35, 62.5);
  });
});

describe("Knob > _radiansToDegrees", () => {
  it("should convert radians to degrees", () => {
    const instance = new Knob();
    const rad = 1.25;

    const degrees = instance._radiansToDegrees(rad);
    expect(degrees).toEqual(71.6197243913529);
  });
});

describe("Knob > _reset", () => {
  it("should rotate the needle back to the default position", () => {
    const instance = new Knob();
    instance._rotate = jest.fn();

    instance._reset();

    expect(instance._rotate).toHaveBeenCalledWith({ x: 35, y: 70 });
  });
});

describe("Knob > _rotate", () => {
  it("should rotate the needle", () => {
    const ctx = global.SVGContext;
    const instance = new Knob();
    instance._instance = ctx.group();
    instance._createNeedle();

    const evt = { x: 35, y: 70 };
    instance._rotate(evt);

    expect(instance._needle.transform).toHaveBeenCalledWith({
      cx: 35,
      cy: 35,
      rotation: 0
    });
  });
});

describe("Knob > setupEventListeners", () => {
  it("should create some event listeners", () => {
    const ctx = global.SVGContext;
    const instance = new Knob(ctx);
    instance._createGroup();

    instance._setupEventListeners();

    expect(instance._ctx.on).toHaveBeenCalled();
    expect(instance._instance.on).toHaveBeenCalledTimes(3);
  });
});

describe("Knob > _slopeToRadians", () => {
  it("should convert a slope to radian", () => {
    const instance = new Knob();

    const radians = instance._slopeToRadians(1, 2, 3, 7);
    expect(radians).toEqual(1.1902899496825317);
  });
});
