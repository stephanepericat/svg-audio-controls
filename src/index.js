import "./sass/index.scss";

import SVG from "svg.js";

// constants
const radius = 100;
const padding = 20;
const size = radius + padding * 2;
const x1 = size / 2;
const y1 = x1;
const x2 = x1;
const y2 = size - 15;
const zeroOffset = 90;
const strokeWidth = 10;
const offsetTop = 100;
const offsetLeft = 300;
const fillColor = "#fff";
const strokeColor = "#111";
const backgroundColor = "#ccc";
const needleColor = "#f00";

// SVG app
const App = new SVG(document.querySelector(".container"));

// knob group
const knob = App.group();
knob.move(offsetLeft, offsetTop);

// knob background
const background = knob.rect(size, size).fill(backgroundColor);

// knob circle
const circle = knob.circle(radius);
circle.fill(fillColor);
circle.stroke({ color: strokeColor, width: strokeWidth });
circle.move(padding, padding);

// knob needle
const needle = knob.line(x1, y1, x2, y2);
needle.stroke({ color: needleColor, linecap: "round", width: strokeWidth });

// logic
// const calculcateSlope = (x1, y1, x2, y2) => (y2 - y1) / (x2 - x1);
const slopeToRad = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
const radToDegrees = rad => (rad * 360) / (Math.PI * 2);

let isRotating = false;
const centerY = offsetTop + size / 2;
const centerX = offsetLeft + size / 2;

knob.on("mousedown", e => {
  isRotating = true;

  const rad = slopeToRad(centerX, centerY, e.x, e.y);
  const angle = radToDegrees(rad);

  needle.transform({ rotation: angle - zeroOffset, cx: x1, cy: y1 });
});

knob.on("mousemove", e => {
  if (!isRotating) return;

  const rad = slopeToRad(centerX, centerY, e.x, e.y);
  const angle = radToDegrees(rad);

  // let value = angle - zeroOffset;
  // if (value < 0) {
  //   value += 360;
  // }

  // console.log("VALUE >>>>", Math.round(value));

  needle.transform({ rotation: angle - zeroOffset, cx: x1, cy: y1 });
});

App.on("mouseup", e => {
  isRotating = false;
});
