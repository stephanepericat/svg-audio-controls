import greeting from "../src/js/demo";

describe("Greeting", () => {
  it("should return a string", () => {
    expect(greeting("jest")).toEqual("Hello, jest!");
  });

  it("should return a default string, if no argument is provided", () => {
    expect(greeting()).toEqual("Hello, world!");
  });
});
