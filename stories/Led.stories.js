import { SVG } from "@svgdotjs/svg.js";
import rgb2hex from "rgb2hex";
import { Led } from "../src/";

export default {
  title: "SVG Audio Controls/Led",
  argTypes: {
    highlightColor: { control: { type: "color" } },
    offsetLeft: { control: { type: "range", min: 0, max: 50, step: 1 } },
    offsetTop: { control: { type: "range", min: 0, max: 50, step: 1 } },
    radius: { control: { type: "range", min: 10, max: 25, step: 1 } },
    strokeWidth: { control: { type: "range", min: 1, max: 5, step: 1 } }
  },
};

const Template = ({
  highlightColor,
  isOn,
  offsetLeft,
  offsetTop,
  radius,
  strokeWidth
}) => {
  const App = SVG().size("100%", "100%");

  const led = new Led(App, {
    offsetLeft,
    offsetTop,
    radius,
    strokeWidth
  });

  led.append();

  led.isOn = isOn;
  led.highlightColor = rgb2hex(highlightColor).hex;

  return App.node;
};

export const Default = Template.bind({});

Default.args = {
  highlightColor: "#0c0",
  isOn: false,
  offsetLeft: 0,
  offsetTop: 0,
  radius: 15,
  strokeWidth: 5
};
