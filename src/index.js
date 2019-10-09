import "./sass/index.scss";

import SVG from "svg.js";
import Knob from "./js/Knob";
import Switch from "./js/Switch";

// SVG app
const App = new SVG(document.querySelector(".container"));

const k1 = new Knob(App, {
  // backgroundColor: "#ccc",
  // fillColor: "#fff",
  // needleColor: "#f00",
  // offsetLeft: 300,
  // offsetTop: 100,
  // padding: 20,
  // radius: 100,
  // strokeColor: "#111",
  // strokeWidth: 10
});

k1.append();
k1.onChange = ({ detail } = {}) => console.log("value changed", detail);

console.log("KNOB 1: ", k1);

const sw1 = new Switch(App, {
  backgroundColor: "#151515",
  isHorizontal: true,
  offsetLeft: 20,
  offsetTop: 50,
  padding: 5,
  size: 30,
  steps: 3,
  strokeColor: "#ccc",
  switchColor: "#666"
});

sw1.append();
sw1.onChange = ({ detail } = {}) => console.log("value changed", detail);

console.log("SWITCH 1: ", sw1);
