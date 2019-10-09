module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/js/*.js",
    "!**/src/index.js",
    "!**/node_modules/**"
  ],
  coverageDirectory: "coverage",
  setupFiles: ["<rootDir>/jest.setup.js"],
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  }
};
