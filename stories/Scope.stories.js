import { SVG } from "@svgdotjs/svg.js";
import rgb2hex from "rgb2hex";
import { Scope } from "../src/";

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const osc = ctx.createOscillator();
osc.type = "sine";
osc.frequency.setValueAtTime(440, ctx.currentTime);
osc.start();

const analyser = ctx.createAnalyser();
analyser.fftSize = 1024;
const bufferLength = analyser.frequencyBinCount;
osc.connect(analyser);

let dataArray = new Uint8Array(bufferLength);
const interval = (1 / 44100) * 512 * 1000;
let refresh = null;

export default {
  title: "SVG Audio Controls/Scope",
  argTypes: {
    backgroundColor: { control: { type: "color" } },
    divisions: { control: { type: "range", min: 2, max: 12, step: 1 } },
    gridColor: { control: { type: "color" } },
    offsetLeft: { control: { type: "range", min: 0, max: 50, step: 1 } },
    offsetTop: { control: { type: "range", min: 0, max: 50, step: 1 } },
    oscSpeed: { control: { type: "range", min: 100, max: 1500, step: 1 } },
    oscType: { control: { type: "select", options: ["sine", "square", "triangle", "sawtooth"] } },
    signalColor: { control: { type: "color" } },
    signalWidth: { control: { type: "range", min: 1, max: 5, step: 1 } },
    width: { control: { type: "range", min: 100, max: 500, step: 10 } }
  },
};

const Template = ({
  backgroundColor,
  divisions,
  gridColor,
  offsetLeft,
  offsetTop,
  oscSpeed,
  oscType,
  signalColor,
  signalWidth,
  width
}) => {
  const App = SVG().size("100%", "100%");

  const scope = new Scope(App, {
    backgroundColor: rgb2hex(backgroundColor).hex,
    divisions,
    gridColor: rgb2hex(gridColor).hex,
    offsetLeft,
    offsetTop,
    signalColor: rgb2hex(signalColor).hex,
    signalWidth,
    width
  });

  scope.append();

  osc.type = oscType;
  osc.frequency.setValueAtTime(oscSpeed, ctx.currentTime);

  if(refresh) {
    clearInterval(refresh);
    refresh = null;
  }

  setInterval(() => {
    analyser.getByteTimeDomainData(dataArray);
    let points = [];
    for (let i = 0; i < 512; i++) {
      points[i] = [i, dataArray[i]];
    }
    scope.draw(points);
  }, Math.pow(interval, 2));

  return App.node;
};

export const Default = Template.bind({});

Default.args = {
  backgroundColor: "#181818",
  divisions: 6,
  gridColor: "#535353",
  offsetLeft: 0,
  offsetTop: 0,
  oscSpeed: 440,
  oscType: "square",
  signalColor: "#28dfa0",
  signalWidth: 4,
  width: 400
};
