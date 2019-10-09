import AudioControl from "../src/js/AudioControl";

describe("AudioControl > constructor", () => {
  it("should set some properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVG;

    const instance = new AudioControl(ctx, options);

    expect(instance._ctx).toEqual(ctx);
    expect(instance._options).toEqual(options);
  });

  it("should set some default properties if no argumenrts are passed", () => {
    const instance = new AudioControl();

    expect(instance._ctx).toBe(null);
    expect(instance._options).toEqual({});
  });
});
