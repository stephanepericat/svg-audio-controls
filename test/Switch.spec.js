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
