import "./sass/index.scss";

import SVG from "svg.js";
import Knob from "./js/Knob";
import Switch from "./js/Switch";

// SVG app
const App = new SVG(document.querySelector(".container"));

const k1 = new Knob(App, {
  backgroundColor: "#ccc",
  fillColor: "#fff",
  needleColor: "#f00",
  offsetLeft: 300,
  offsetTop: 100,
  padding: 20,
  radius: 100,
  strokeColor: "#111",
  strokeWidth: 10
});

k1.append();
k1.onValueChange = ({ detail } = {}) =>
  console.log("K1 > value changed: ", detail.value);

// console.log("KNOB 1: ", k1);

const k2 = new Knob(App, {
  fillColor: "#eee",
  offsetLeft: 440,
  offsetTop: 150,
  strokeColor: "#fc0"
});

k2.append();
k2.onValueChange = ({ detail } = {}) =>
  console.log("K2 > value changed: ", detail.value);

const sw1 = new Switch(App, {
  backgroundColor: "#151515",
  isHorizontal: true,
  offsetLeft: 120,
  offsetTop: 80,
  padding: 5,
  size: 30,
  steps: 3,
  strokeColor: "#ccc",
  switchColor: "#666"
});

sw1.append();
sw1.onValueChange = ({ detail } = {}) =>
  console.log("SW1 value changed: ", detail.value);

// console.log("SWITCH 1: ", sw1);

const sw2 = new Switch(App, {
  offsetLeft: 250,
  offsetTop: 80
});
sw2.append();
sw2.onValueChange = ({ detail } = {}) =>
  console.log("SW2 value changed: ", detail.value);
