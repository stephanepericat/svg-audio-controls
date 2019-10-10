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

describe("Button > Getters", () => {
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

describe("Button > append", () => {
  it("should create the button interface", () => {
    const instance = new Button();
    instance._createGroup = jest.fn();
    instance._createBackground = jest.fn();
    instance._createButton = jest.fn();
    instance._deactivate = jest.fn();
    instance._setupEventListeners = jest.fn();

    instance.append();

    expect(instance._createGroup).toHaveBeenCalledWith({
      left: instance.offsetLeft,
      top: instance.offsetTop
    });
    expect(instance._createBackground).toHaveBeenCalledWith({
      width: instance.size,
      height: instance.size,
      backgroundColor: instance.backgroundColor
    });
    expect(instance._createButton).toHaveBeenCalled();
    expect(instance._deactivate).toHaveBeenCalled();
    expect(instance._setupEventListeners).toHaveBeenCalled();
  });
});

describe("Button > _activate", () => {
  it("should turn the button on", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});
    instance._instance = ctx.group();
    instance._createButton();
    instance._sendValue = jest.fn();

    instance._activate();

    expect(instance._button.animate).toHaveBeenCalledWith(50);
    expect(instance._sendValue).toHaveBeenCalledWith(1);
  });
});

describe("Button > _createButton", () => {
  it("should create the button element", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});
    instance._instance = ctx.group();

    instance._createButton();

    expect(instance._instance.circle).toHaveBeenCalledWith(50);
    expect(instance._button.stroke).toHaveBeenCalledWith({
      color: instance.strokeColor,
      width: instance.strokeWidth
    });
    expect(instance._button.move).toHaveBeenCalledWith(
      instance.padding,
      instance.padding
    );
  });
});

describe("Button > _deactivate", () => {
  it("should turn the button off", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});
    instance._instance = ctx.group();
    instance._createButton();
    instance._sendValue = jest.fn();

    instance._deactivate();

    expect(instance._button.animate).toHaveBeenCalledWith(50);
    expect(instance._sendValue).toHaveBeenCalledWith(0);
  });

  it("should not animate the transition if the flag is false", () => {
    const ctx = global.SVGContext;
    const animate = false;
    const instance = new Button(ctx, {});
    instance._instance = ctx.group();
    instance._createButton();
    instance._sendValue = jest.fn();

    instance._deactivate(animate);

    expect(instance._button.animate).not.toHaveBeenCalled();
  });

  it("should not send the value is the button is a trigger", () => {
    const ctx = global.SVGContext;
    const animate = true;
    const temporary = true;
    const instance = new Button(ctx, { temporary });
    instance._instance = ctx.group();
    instance._createButton();
    instance._sendValue = jest.fn();

    const d = instance._deactivate(animate);

    expect(instance._sendValue).not.toHaveBeenCalled();
  });
});

describe("Button > _onClick", () => {
  it("should call '_toggle' if the button is not temporary", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});

    instance._toggle = jest.fn();

    instance._onClick();

    expect(instance._toggle).toHaveBeenCalled();
  });

  it("should call '_trigger' if the button is temporary", () => {
    const ctx = global.SVGContext;
    const temporary = true;
    const instance = new Button(ctx, { temporary });

    instance._trigger = jest.fn();

    instance._onClick();

    expect(instance._trigger).toHaveBeenCalled();
  });
});

describe("Button > _setupEventListeners", () => {
  it("should listen for click events", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});
    instance._button = ctx.group().circle();

    instance._setupEventListeners();
    expect(instance._button.on).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
  });
});

describe("Button > _toggle", () => {
  it("should call '_activate' if the button is off", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});
    instance._activate = jest.fn();

    instance._toggle();
    expect(instance._activate).toHaveBeenCalled();
  });

  it("should call '_deactivate' if the button is on", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});
    instance._deactivate = jest.fn();
    instance.isOn = true;

    instance._toggle();
    expect(instance._deactivate).toHaveBeenCalled();
  });
});

describe("Button > _trigger", () => {
  jest.useFakeTimers();

  it("should call '_activate' and '_deactivate'", () => {
    const ctx = global.SVGContext;
    const instance = new Button(ctx, {});
    instance._activate = jest.fn();
    instance._deactivate = jest.fn();

    instance._trigger();

    expect(instance._activate).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
  });
});
