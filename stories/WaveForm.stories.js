import { SVG } from "@svgdotjs/svg.js";
import rgb2hex from "rgb2hex";
import { WaveForm } from "../src/";

const url = "/sounds/499763__phonosupf__shakuhachi-attack-9.wav?raw=true";

const displayWaveForm = async (url, display) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

  try {
    const ajax = await fetch(url);
    const buffer = await ajax.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(buffer);
    const audioData = audioBuffer.getChannelData(0);

    display.audioData = audioData;
  } catch (e) {
    console.error("ERROR", e.message);
  }
};

export default {
  title: "SVG Audio Controls/WaveForm",
  argTypes: {
    backgroundColor: { control: { type: "color" } },
    height: { control: { type: "range", min: 50, max: 250, step: 10 } },
    offsetLeft: { control: { type: "range", min: 0, max: 50, step: 1 } },
    offsetTop: { control: { type: "range", min: 0, max: 50, step: 1 } },
    shadowColor: { control: { type: "color" } },
    shadowOpacity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    waveFormColor: { control: { type: "color" } },
    width: { control: { type: "range", min: 50, max: 1250, step: 10 } }
  },
};

const Template = ({
  backgroundColor,
  hasShadow,
  height,
  offsetLeft,
  offsetTop,
  shadowColor,
  shadowOpacity,
  waveFormColor,
  width
}) => {
  const App = SVG().size("100%", "100%");

  const display = new WaveForm(App, {
    backgroundColor: rgb2hex(backgroundColor).hex,
    hasShadow,
    height,
    offsetLeft,
    offsetTop,
    shadowColor: rgb2hex(shadowColor).hex,
    shadowOpacity,
    waveFormColor: rgb2hex(waveFormColor).hex,
    width
  });

  display.append();

  displayWaveForm(url, display).then(() => console.log("done loading file"));

  return App.node;
};

export const Default = Template.bind({});

Default.args = {
  backgroundColor: "#111",
  hasShadow: true,
  height: 250,
  offsetLeft: 0,
  offsetTop: 0,
  shadowColor: "#f00",
  shadowOpacity: 0.2,
  waveFormColor: "#f70",
  width: 700
};
