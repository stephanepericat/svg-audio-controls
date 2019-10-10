import Button from "../src/js/Button";

describe("Button > constructor", () => {
  it("should extend AudioControl", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Button(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Button(ctx, options);

    expect(instance._on).toBe(false);
    expect(instance._button).toBe(null);
  });
});

describe("Button > getters", () => {
  test("activeColor", () => {
    const activeColor = "#ff0";
    const instance = new Button({}, { activeColor });
    expect(instance.activeColor).toEqual(activeColor);
  });

  test("activeColor > default", () => {
    const instance = new Button();
    expect(instance.activeColor).toEqual("#f00");
  });

  test("backgroundColor", () => {
    const backgroundColor = "#ff0";
    const instance = new Button({}, { backgroundColor });
    expect(instance.backgroundColor).toEqual(backgroundColor);
  });

  test("backgroundColor > default", () => {
    const instance = new Button();
    expect(instance.backgroundColor).toEqual("#fff");
  });

  test("fillColor", () => {
    const fillColor = "#ff0";
    const instance = new Button({}, { fillColor });
    expect(instance.fillColor).toEqual(fillColor);
  });

  test("fillColor > default", () => {
    const instance = new Button();
    expect(instance.fillColor).toEqual("#ccc");
  });

  test("isOn", () => {
    const instance = new Button();
    expect(instance.isOn).toBe(false);
  });

  test("isTemporary", () => {
    const temporary = true;
    const instance = new Button({}, { temporary });
    expect(instance.isTemporary).toBe(temporary);
  });

  test("isTemporary > default", () => {
    const instance = new Button();
    expect(instance.isTemporary).toBe(false);
  });

  test("radius", () => {
    const radius = 20;
    const instance = new Button({}, { radius });
    expect(instance.radius).toEqual(radius);
  });

  test("radius > default", () => {
    const instance = new Button();
    expect(instance.radius).toEqual(50);
  });

  test("size", () => {
    const instance = new Button();
    expect(instance.size).toEqual(70);
  });

  test("strokeColor", () => {
    const strokeColor = "#ff0";
    const instance = new Button({}, { strokeColor });
    expect(instance.strokeColor).toEqual(strokeColor);
  });

  test("strokeColor > default", () => {
    const instance = new Button();
    expect(instance.strokeColor).toEqual("#333");
  });

  test("strokeWidth", () => {
    const strokeWidth = 10;
    const instance = new Button({}, { strokeWidth });
    expect(instance.strokeWidth).toEqual(strokeWidth);
  });

  test("strokeWidth > default", () => {
    const instance = new Button();
    expect(instance.strokeWidth).toEqual(5);
  });
});

describe("Button > Setters", () => {
  test("isOn", () => {
    const instance = new Button();
    const isOn = true;
    expect(instance.isOn).toBe(false);
    instance.isOn = isOn;
    expect(instance.isOn).toEqual(isOn);
  });
});
