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
