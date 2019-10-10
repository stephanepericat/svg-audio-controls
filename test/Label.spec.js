import Label from "../src/js/Label";

describe("Label > constructor", () => {
  it("should extend AudioControl", () => {
    const ctx = global.SVGContext;
    const options = {};
    const instance = new Label(ctx, {});

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const instance = new Label();

    expect(instance._value).toBe(null);
    expect(instance._label).toBe(null);
  });
});

describe("Label > Getters", () => {
  test("defaultText", () => {
    const defaultText = 10;
    const instance = new Label({}, { defaultText });
    expect(instance.defaultText).toEqual(defaultText.toString());
  });

  test("defaultText > default", () => {
    const instance = new Label();
    expect(instance.defaultText).toEqual("");
  });

  test("fontColor", () => {
    const fontColor = "#f70";
    const instance = new Label({}, { fontColor });
    expect(instance.fontColor).toEqual(fontColor);
  });

  test("fontColor > default", () => {
    const instance = new Label();
    expect(instance.fontColor).toEqual("#000");
  });

  test("fontFamily", () => {
    const fontFamily = "Roboto";
    const instance = new Label({}, { fontFamily });
    expect(instance.fontFamily).toEqual(fontFamily);
  });

  test("fontFamily > default", () => {
    const instance = new Label();
    expect(instance.fontFamily).toEqual("Helvetica, Arial, sans-serif");
  });

  test("fontSize", () => {
    const fontSize = 22;
    const instance = new Label({}, { fontSize });
    expect(instance.fontSize).toEqual(fontSize);
  });

  test("fontSize > default", () => {
    const instance = new Label();
    expect(instance.fontSize).toEqual(16);
  });

  test("value", () => {
    const instance = new Label();
    expect(instance.value).toBe(null);
  });
});

describe("Label > Setters", () => {
  test("value", () => {
    const text = "foobar";
    const instance = new Label();
    instance._setText = jest.fn();

    instance.value = text;

    expect(instance._value).toEqual(text);
    expect(instance._setText).toHaveBeenCalled();
  });
});

describe("Label > append", () => {
  it("should create the label interface", () => {
    const instance = new Label();
    instance._createGroup = jest.fn();
    instance._createLabel = jest.fn();

    instance.append();

    expect(instance._createGroup).toHaveBeenCalledWith({
      left: instance.offsetLeft,
      top: instance.offsetTop
    });

    expect(instance._createLabel).toHaveBeenCalled();
  });
});

describe("Label > _addSpan", () => {
  it("should create a span node", () => {
    const instance = new Label();
    const add = {
      tspan: jest.fn(() => ({ attr: jest.fn() }))
    };
    const value = 10;

    instance._addSpan(add, value);
    expect(add.tspan).toHaveBeenCalledWith(value.toString());
  });
});

describe("Label > _createLabel", () => {
  it("should create the text label element", () => {
    const ctx = global.SVGContext;
    const instance = new Label(ctx, {});
    instance._instance = ctx.group();
    instance._setText = jest.fn();

    instance._createLabel();
    expect(instance._instance.text).toHaveBeenCalledWith("");
    expect(instance._label.font).toHaveBeenCalledWith({
      family: "Helvetica, Arial, sans-serif",
      size: 16
    });
    expect(instance._label.fill).toHaveBeenCalledWith("#000");
  });
});

describe("Label > _setText", () => {
  it("should update the text content", () => {
    const ctx = global.SVGContext;
    const instance = new Label(ctx, {});
    instance._instance = ctx.group();
    instance._createLabel();

    instance._setText("foobar");
    expect(instance._label.text).toHaveBeenCalled();
  });
});
