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
  const options = {};
  const ctx = global.SVG;
  let instance;

  beforeEach(() => {
    instance = new Knob(ctx, options);
  });

  afterEach(() => {
    instance = null;
  });

  test("angle", () => expect(instance.angle).toEqual(0));
});
