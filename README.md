[![Build Status](https://travis-ci.org/stephanepericat/svg-audio-controls.svg?branch=master)](https://travis-ci.org/stephanepericat/svg-audio-controls)
[![Coverage Status](https://coveralls.io/repos/github/stephanepericat/svg-audio-controls/badge.svg?branch=master)](https://coveralls.io/github/stephanepericat/svg-audio-controls?branch=master)

# SVG Audio Controls

A set of UI controls for web-based audio apps, built on top of [SVG.js](https://svgjs.com/).

## Installation

### Latest (compatible with @svgdotjs/svg.js@3.x)

```shell
npm install git+https://github.com/stephanepericat/svg-audio-controls.git
```

### Legacy (compatible with svg.js@2.7.1)

```shell
npm install git+https://github.com/stephanepericat/svg-audio-controls.git#1.0.2
```

## Components

### Button

A configurable button. Can also be used as a trigger.

```javascript
import { SVG } from "@svgdotjs/svg.js";
import { Button } from "svg-audio-controls/src/index";

const App = SVG()
  .addTo(document.querySelector(".container"))
  .size("100%", "100%");

const bt = new Button(App, {
  backgroundColor: "#ccc",
  fillColor: "#fff",
  activeColor: "#0c0",
  offsetLeft: 300,
  offsetTop: 250,
  padding: 20,
  radius: 100,
  strokeColor: "#111",
  strokeWidth: 10,
  temporary: false // 'true' for trigger mode
});

// append
bt.append();

// listen to changes
bt.onValueChange = ({ detail }) => console.log("value changed: ", detail.value);
```

### Knob

A configurable knob.

```javascript
import { SVG } from "@svgdotjs/svg.js";
import { Knob } from "svg-audio-controls/src/index";

const App = SVG()
  .addTo(document.querySelector(".container"))
  .size("100%", "100%");

const kb = new Knob(App, {
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

// append
kb.append();

// listen to changes
kb.onValueChange = ({ detail }) => console.log("value changed: ", detail.value);
```

### Label

A configurable label for textual display.

```javascript
import { SVG } from "@svgdotjs/svg.js";
import { Label } from "svg-audio-controls/src/index";

const App = SVG()
  .addTo(document.querySelector(".container"))
  .size("100%", "100%");

const lbl = new Label(App, {
  defaultText: "0.00",
  fontColor: "#f70",
  fontFamily: "Roboto",
  fontSize: 22,
  offsetLeft: 370,
  offsetTop: 80
});

// append
lbl.append();

// change text
lbl.value = "3.14";
```

### Led

A configurable LED.

```javascript
import { SVG } from "@svgdotjs/svg.js";
import { Led } from "svg-audio-controls/src/index";

const App = SVG()
  .addTo(document.querySelector(".container"))
  .size("100%", "100%");

const led = new Led(App, {
  backgroundColor: "#ccc",
  fillColor: "#fff",
  activeColor: "#0c0",
  offsetLeft: 240,
  offsetTop: 130,
  padding: 20,
  strokeColor: "#111",
  radius: 20,
  strokeWidth: 2
});

// append
led.append();
// listen to changes
led.onValueChange = ({ detail }) =>
  console.log("value changed: ", detail.value);

// turn the led on / off
led.toggle();

// change the active color
led.highlightColor = "#f70";
```

### Scope

A configurable oscilloscope.

```javascript
import { SVG } from "@svgdotjs/svg.js";
import { Scope } from "svg-audio-controls/src/index";

const App = SVG()
  .addTo(document.querySelector(".container"))
  .size("100%", "100%");

const sc = new Scope(App, {
  backgroundColor: "#ddd",
  divisions: 6,
  gridColor: "#f70",
  offsetLeft: 250,
  offsetTop: 480,
  signalColor: "#BC6C1C",
  signalWidth: 4,
  width: 400
});

// append
sc.append();

// draw graph
let points = [
  [0, 0],
  [1, 255]
];
sc.draw(points);
```

### Switch

A configurable switch. Can be used vertically or horizontally.

```javascript
import { SVG } from "@svgdotjs/svg.js";
import { Switch } from "svg-audio-controls/src/index";

const App = SVG()
  .addTo(document.querySelector(".container"))
  .size("100%", "100%");

const sw = new Switch(App, {
  backgroundColor: "#151515",
  isHorizontal: false, // 'true' for horizontal mode
  offsetLeft: 120,
  offsetTop: 80,
  padding: 5,
  size: 30,
  steps: 3,
  strokeColor: "#ccc",
  switchColor: "#666"
});

// append
sw.append();

// listen to changes
sw.onValueChange = ({ detail }) => console.log("value changed: ", detail.value);
```

### WaveForm ( _**new in 2.1.0**_ )

TODO !!!

## Tasks

### Build

```shell
npm run build
```

### Test

```shell
npm test
```

## Demo

A demo of this library is available [here](https://github.com/stephanepericat/svg-audio-controls-demo).
