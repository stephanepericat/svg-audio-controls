import Knob from "../src/js/Knob";

describe("Knob > constructor", () => {
  it("should extend AudioControl", () => {
    const options = { foo: "bar" };
    const ctx = global.SVG;

    const instance = new Knob(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVG;

    const instance = new Knob(ctx, options);

    expect(instance._angle).toEqual(0);
    expect(instance._rotating).toBe(false);
    expect(instance._zeroOffset).toEqual(90);
  });
});

describe("Knob > getters", () => {
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

  test("offsetTop", () => {
    const offsetTop = 20;
    const instance = new Knob({}, { offsetTop });
    expect(instance.offsetTop).toEqual(offsetTop);
  });

  test("offsetTop > default", () => {
    const instance = new Knob();
    expect(instance.offsetTop).toEqual(0);
  });

  test("offsetLeft", () => {
    const offsetLeft = 20;
    const instance = new Knob({}, { offsetLeft });
    expect(instance.offsetLeft).toEqual(offsetLeft);
  });

  test("offsetLeft > default", () => {
    const instance = new Knob();
    expect(instance.offsetLeft).toEqual(0);
  });

  test("padding", () => {
    const padding = 20;
    const instance = new Knob({}, { padding });
    expect(instance.padding).toEqual(padding);
  });

  test("padding > default", () => {
    const instance = new Knob();
    expect(instance.padding).toEqual(10);
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

  test("onChange", () => {
    const instance = new Knob();
    instance._instance = {
      on: jest.fn()
    };
    const callback = jest.fn();
    instance.onChange = callback;
    expect(instance._instance.on).toHaveBeenCalledWith("valueChange", callback);
  });
});
