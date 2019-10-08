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

let isRotating = false;
knob.on("mousedown", e => {
  console.log("MOUSE DOWN >>>>", e.x, e.y);
  isRotating = true;
});

knob.on("mousemove", e => {
  if (!isRotating) return;
  console.log("MOUSE MOVE >>>>", e.x, e.y);
});

knob.on("click", e => {
  console.log("CLICK >>>>", e.x, e.y);
});

App.on("mouseup", () => {
  console.log("MOUSE UP >>>>");
  isRotating = false;
});
