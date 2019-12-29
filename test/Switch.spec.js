import Switch from "../src/js/Switch";

describe("Switch > constructor", () => {
  it("should extend AudioControl", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Switch(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Switch(ctx, options);

    expect(instance._selected).toEqual(0);
    expect(instance._switch).toBe(null);
  });
});

describe("Switch > Getters", () => {
  test("backgroundColor", () => {
    const backgroundColor = "#ff0";
    const instance = new Switch({}, { backgroundColor });
    expect(instance.backgroundColor).toEqual(backgroundColor);
  });

  test("backgroundColor > default", () => {
    const instance = new Switch();
    expect(instance.backgroundColor).toEqual("#151515");
  });

  test("borderWidth", () => {
    const instance = new Switch();
    expect(instance.borderWidth).toEqual(4);
  });

  test("currentSelection", () => {
    const instance = new Switch();
    expect(instance.currentSelection).toEqual(0);
  });

  test("isHorizontal", () => {
    const instance = new Switch();
    expect(instance.isHorizontal).toEqual(false);
  });

  test("isHorizontal > default", () => {
    const isHorizontal = true;
    const instance = new Switch({}, { isHorizontal });
    expect(instance.isHorizontal).toEqual(isHorizontal);
  });

  test("size", () => {
    const size = 30;
    const instance = new Switch({}, { size });
    expect(instance.size).toEqual(size);
  });

  test("size > default", () => {
    const instance = new Switch();
    expect(instance.size).toEqual(20);
  });

  test("stepsAmount", () => {
    const stepsAmount = 5;
    const instance = new Switch({}, { steps: stepsAmount });
    expect(instance.stepsAmount).toEqual(stepsAmount);
  });

  test("stepsAmount > default", () => {
    const instance = new Switch();
    expect(instance.stepsAmount).toEqual(2);
  });

  test("strokeColor", () => {
    const strokeColor = "#ff0";
    const instance = new Switch({}, { strokeColor });
    expect(instance.strokeColor).toEqual(strokeColor);
  });

  test("strokeColor > default", () => {
    const instance = new Switch();
    expect(instance.strokeColor).toEqual("#ccc");
  });

  test("switchColor", () => {
    const switchColor = "#ff0";
    const instance = new Switch({}, { switchColor });
    expect(instance.switchColor).toEqual(switchColor);
  });

  test("switchColor > default", () => {
    const instance = new Switch();
    expect(instance.switchColor).toEqual("#666");
  });

  test("switchOffset", () => {
    const size = 15;
    const instance = new Switch({}, { size });
    expect(instance.switchOffset).toEqual(size / 10);
  });
});

describe("Switch > Setters", () => {
  test("currentSelection", () => {
    const instance = new Switch();
    const selection = 3;
    instance.currentSelection = selection;
    expect(instance._selected).toEqual(selection);
  });
});

describe("Switch > append", () => {
  it("should create the switch interface", () => {
    const instance = new Switch();
    instance._createChild = jest.fn();
    instance._createBackground = jest.fn(() => ({ stroke: jest.fn() }));
    instance._createSwitch = jest.fn();
    instance._setupEventListeners = jest.fn();
    instance._scale = jest.fn();

    instance.append();

    expect(instance._createChild).toHaveBeenCalled();
    expect(instance._createBackground).toHaveBeenCalled();
    expect(instance._createSwitch).toHaveBeenCalled();
    expect(instance._setupEventListeners).toHaveBeenCalled();
    expect(instance._scale).toHaveBeenCalled();
  });
});

describe("Switch > _createSwitch", () => {
  it("should create the switch element", () => {
    const ctx = global.SVGContext;
    const instance = new Switch(ctx, {});
    instance._instance = ctx.group();

    instance._moveSwitch = jest.fn();
    instance._createSwitch();

    expect(instance._instance.rect).toHaveBeenCalledWith(16, 16);
    expect(instance._moveSwitch).toHaveBeenCalledWith(
      { left: 2, top: 2 },
      false
    );
  });
});

describe("Switch > _getDimensions", () => {
  it("should set a width if the switch is horizontal", () => {
    const isHorizontal = true;
    const size = 15;
    const steps = 3;
    const instance = new Switch({}, { isHorizontal, size, steps });

    const dimensions = instance._getDimensions();
    expect(dimensions).toEqual({ height: size, width: size * steps });
  });

  it("should set a height if the switch is not horizontal", () => {
    const isHorizontal = false;
    const size = 15;
    const steps = 3;
    const instance = new Switch({}, { isHorizontal, size, steps });

    const dimensions = instance._getDimensions();
    expect(dimensions).toEqual({ height: size * steps, width: size });
  });
});

describe("Switch > _moveSwitch", () => {
  it("should animate the transition", () => {
    const ctx = global.SVGContext;
    const instance = new Switch(ctx, {});
    instance._instance = ctx.group();
    instance._createSwitch();
    instance._moveSwitch({});

    expect(instance._switch.animate).toHaveBeenCalledWith(100);
  });

  it("should disable the transition if the flag is 'false'", () => {
    const ctx = global.SVGContext;
    const instance = new Switch(ctx, {});
    const animate = false;
    const position = { left: 15, top: 35 };
    instance._instance = ctx.group();
    instance._createSwitch();
    instance._moveSwitch(position, animate);

    expect(instance._switch.animate).not.toHaveBeenCalled();
  });
});

describe("Switch > _setupEventListeners", () => {
  it("should listen to click events", () => {
    const ctx = global.SVGContext;
    const instance = new Switch(ctx, {});
    instance._instance = ctx.group();

    instance._setupEventListeners();
    expect(instance._instance.on).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
  });
});

describe("Switch > _updateSelection", () => {
  it("should update the left position, if the switch is horizontal", () => {
    const isHorizontal = true;
    const instance = new Switch({}, { isHorizontal });
    instance._moveSwitch = jest.fn();
    instance._sendValue = jest.fn();

    instance._updateSelection();

    expect(instance.currentSelection).toEqual(1);
    expect(instance._moveSwitch).toHaveBeenCalledWith({ left: 22, top: 2 });
    expect(instance._sendValue).toHaveBeenCalledWith(1);
  });

  it("should update the top position, if the switch is not horizontal", () => {
    const isHorizontal = false;
    const instance = new Switch({}, { isHorizontal });
    instance._moveSwitch = jest.fn();
    instance._sendValue = jest.fn();

    instance._updateSelection();

    expect(instance.currentSelection).toEqual(1);
    expect(instance._moveSwitch).toHaveBeenCalledWith({ left: 2, top: 22 });
    expect(instance._sendValue).toHaveBeenCalledWith(1);
  });

  it("should reset the current selection, if the current value is equal to 'steps - 1'", () => {
    const isHorizontal = false;
    const steps = 3;
    const instance = new Switch({}, { isHorizontal, steps });
    instance._moveSwitch = jest.fn();
    instance._sendValue = jest.fn();
    instance.currentSelection = steps - 1;

    instance._updateSelection();

    expect(instance.currentSelection).toEqual(0);
  });
});
