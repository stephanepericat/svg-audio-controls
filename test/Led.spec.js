import Led from "../src/js/Led";

describe("Led > constructor", () => {
  it("should extend Button", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;
    const instance = new Led(ctx, options);

    expect(instance._on).toBe(false);
    expect(instance._button).toBe(null);
  });
});

describe("Led > Setters", () => {
  test("highlightColor > isOn = false", () => {
    const ctx = global.SVGContext;
    const color = "#ff0";
    const instance = new Led(ctx, {});
    instance._button = ctx.group().circle();

    instance.highlightColor = color;
    expect(instance._options.activeColor).toEqual(color);
    expect(instance._button.animate).not.toHaveBeenCalled();
  });

  test("highlightColor > isOn = true", () => {
    const ctx = global.SVGContext;
    const color = "#ff0";
    const instance = new Led(ctx, {});
    instance._button = ctx.group().circle();
    instance.isOn = true;

    instance.highlightColor = color;
    expect(instance._options.activeColor).toEqual(color);
    expect(instance._button.animate).toHaveBeenCalledWith(100);
  });
});

describe("Led > toggle", () => {
  it("should call _toggle", () => {
    const instance = new Led();
    instance._toggle = jest.fn();

    instance.toggle();
    expect(instance._toggle).toHaveBeenCalled();
  });
});

describe("Led > _setupEventListeners", () => {
  it("should overwrite the parent method", () => {
    const instance = new Led();

    const s = instance._setupEventListeners();
    expect(s).toBe(false);
  });
});
