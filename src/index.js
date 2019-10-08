import "./sass/index.scss";

import SVG from "svg.js";

// constants
const radius = 100;
const padding = 20;
const size = radius + padding * 2;
const strokeWidth = 10;
const offsetTop = 100;
const offsetLeft = 300;
const fillColor = "#fff";
const strokeColor = "#111";
const backgroundColor = "#ccc";

// SVG app
const App = new SVG(document.querySelector(".container"));

// knob group
const knob = App.group();
knob.move(offsetLeft, offsetTop);

const background = knob.rect(size, size).fill(backgroundColor);

// circle
const circle = knob.circle(radius);
circle.fill(fillColor);
circle.stroke({ color: strokeColor, width: strokeWidth });
circle.move(padding, padding);

// needle
const needle = knob.line(size / 2, size / 2, size / 2, size - 15);
needle.stroke({ color: strokeColor, linecap: "round", width: strokeWidth });

// logic
const calculcateSlope = (x1, y1, x2, y2) => (y2 - y1) / (x2 - x1);
const slopeToRad = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
const radToDegrees = rad => (rad * 360) / (Math.PI * 2);

let isRotating = false;
const centerY = offsetTop + size / 2;
const centerX = offsetLeft + size / 2;
const startSlope = calculcateSlope(size / 2, size / 2, size / 2, size - 15);
const startRadian = slopeToRad(size / 2, size / 2, size / 2, size - 15);
const startAngle = radToDegrees(startRadian);

console.log(
  `CENTER x: ${centerX}, y: ${centerY}, start slope: ${startSlope}, start radian: ${startRadian}, start angle: ${startAngle}`
);

knob.on("mousedown", e => {
  // console.log("MOUSE DOWN >>>>", e.x, e.y);
  isRotating = true;

  const slope = calculcateSlope(centerX, centerY, e.x, e.y);
  const rad = slopeToRad(centerX, centerY, e.x, e.y);
  const angle = radToDegrees(rad);

  console.log(`(MD) SLOPE: ${slope}, RADIAN: ${rad}, ANGLE: ${angle}`);
});

knob.on("mousemove", e => {
  if (!isRotating) return;
  // console.log("MOUSE MOVE >>>>", e.x, e.y);
  const slope = calculcateSlope(centerX, centerY, e.x, e.y);
  const rad = slopeToRad(centerX, centerY, e.x, e.y);
  const angle = radToDegrees(rad);

  console.log(`(MM) SLOPE: ${slope}, RADIAN: ${rad}, ANGLE: ${angle}`);
});

// knob.on("click", e => {
//   console.log("CLICK >>>>", e.x, e.y);
// });

App.on("mouseup", e => {
  // console.log("MOUSE UP >>>>");
  isRotating = false;

  const slope = calculcateSlope(centerX, centerY, e.x, e.y);
  const rad = slopeToRad(centerX, centerY, e.x, e.y);
  const angle = radToDegrees(rad);

  console.log(`(MU) SLOPE: ${slope}, RADIAN: ${rad}, ANGLE: ${angle}`);
});
