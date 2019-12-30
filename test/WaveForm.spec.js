import AudioBuffer from "./utils/MockBuffer";
import "jasmine-expect";

describe("Mock AudioBuffer", () => {
  it("should return an audio buffer", () => {
    const b = new AudioBuffer();
    expect(b.getChannelData).toBeFunction();
  });
});
