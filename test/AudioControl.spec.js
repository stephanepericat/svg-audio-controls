import AudioControl from "../src/js/AudioControl";

describe("AudioControl > constructor", () => {
  it("should set some properties", () => {
    const options = { foo: "bar" };
    const ctx = global.SVGContext;

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

describe("AudioControl > _createGroup", () => {
  it("should create a group", () => {
    const ctx = global.SVGContext;
    const instance = new AudioControl(ctx);
    const options = { left: 10, top: 20 };

    instance._createGroup(options);

    expect(instance._ctx.group).toHaveBeenCalled();
    expect(instance._instance.move).toHaveBeenCalledWith(
      options.left,
      options.top
    );
  });

  it("should fall back on default values", () => {
    const ctx = global.SVGContext;
    const instance = new AudioControl(ctx);

    instance._createGroup();

    expect(instance._instance.move).toHaveBeenCalledWith(0, 0);
  });
});

describe("AudioControl > _createBackground", () => {
  it("should create a rectangle", () => {
    const ctx = global.SVGContext;
    const instance = new AudioControl();
    instance._instance = ctx.group();
    const options = { width: 10, height: 10, backgroundColor: "#ff0" };

    instance._createBackground(options);

    expect(instance._instance.rect).toHaveBeenCalledWith(
      options.width,
      options.height
    );
  });

  it("should fall back on default values", () => {
    const ctx = global.SVGContext;
    const instance = new AudioControl();
    instance._instance = ctx.group();

    instance._createBackground({});

    expect(instance._instance.rect).toHaveBeenCalledWith(20, 20);
  });

  it("should return if there is no instance", () => {
    const ctx = global.SVGContext;
    const instance = new AudioControl();

    instance._createBackground({});

    expect(instance._instance).toBe(null);
    expect(instance._background).toBe(null);
  });
});

describe("AudioControl > _sendValue", () => {
  it("should fire an event", () => {
    const ctx = global.SVGContext;
    const instance = new AudioControl();
    instance._instance = ctx.group();
    const value = 3.14;

    instance._sendValue(value);

    expect(instance._instance.fire).toHaveBeenCalledWith("valueChange", {
      value
    });
  });
});
