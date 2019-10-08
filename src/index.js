import "./sass/index.scss";

import SVG from "svg.js";
import Knob from "./js/Knob";

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

k1.onChange = ({ detail } = {}) => console.log("value changed", detail);

console.log("KNOB 1: ", k1);
