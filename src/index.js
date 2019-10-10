import "./sass/index.scss";

import SVG from "svg.js";

import Button from "./js/Button";
import Knob from "./js/Knob";
import Label from "./js/Label";
import Switch from "./js/Switch";

// SVG app
const App = new SVG(document.querySelector(".container"));

const b1 = new Button(App, {
  backgroundColor: "#ccc",
  fillColor: "#fff",
  activeColor: "#0c0",
  offsetLeft: 300,
  offsetTop: 250,
  padding: 20,
  radius: 100,
  strokeColor: "#111",
  strokeWidth: 10
});
b1.append();
b1.onValueChange = ({ detail }) =>
  console.log("B1 value changed: ", detail.value);
// console.log("B1", b1);

const b2 = new Button(App, {
  offsetLeft: 440,
  offsetTop: 290,
  temporary: true
});
b2.append();
b2.onValueChange = ({ detail }) =>
  console.log("B2 value changed: ", detail.value);
// console.log("B2", b2);

const lbl1 = new Label(App, {
  defaultText: "0.00",
  fontColor: "#f70",
  fontFamily: "Roboto",
  fontSize: 22,
  offsetLeft: 370,
  offsetTop: 80
});

lbl1.append();

// console.log("LBL1", lbl1);

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
k1.onValueChange = ({ detail } = {}) => {
  console.log("K1 > value changed: ", detail.value);
  lbl1.value = detail.value.toFixed(2);
};

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
