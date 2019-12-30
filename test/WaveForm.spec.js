import WaveForm from "../src/js/WaveForm";
import "jasmine-expect";

describe("WaveForm > Setters > audioData", () => {
  it("should store and render an AudioBuffer", () => {
    const b = new AudioBuffer();
    const options = {};
    const ctx = global.SVGContext;
    const w = new WaveForm(ctx, options);
    const renderMock = jest.fn();
    w._render = renderMock;

    w.audioData = b;

    expect(renderMock).toHaveBeenCalledWith(b);
  });
});
