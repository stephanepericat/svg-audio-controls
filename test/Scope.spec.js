import Scope from "../src/js/Scope";

describe("Scope > constructor", () => {
  it("should extend AudioControl", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Scope(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some additional properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

    const instance = new Scope(ctx, options);

    expect(instance._scope).toBe(null);
    expect(instance._signal).toBe(null);
  });
});
