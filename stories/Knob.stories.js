import { SVG } from "@svgdotjs/svg.js";
import rgb2hex from "rgb2hex";
import { action } from "@storybook/addon-actions";
import { Knob } from "../src/";

export default {
  title: "SVG Audio Controls/Knob",
  argTypes: {
    backgroundColor: { control: { type: "color" } },
    fillColor: { control: { type: "color" } },
    needleColor: { control: { type: "color" } },
    offsetLeft: { control: { type: "range", min: 0, max: 50, step: 1 } },
    offsetTop: { control: { type: "range", min: 0, max: 50, step: 1 } },
    padding: { control: { type: "range", min: 10, max: 50, step: 1 } },
    radius: { control: { type: "range", min: 50, max: 200, step: 1 } },
    strokeColor: { control: { type: "color" } },
    strokeWidth: { control: { type: "range", min: 1, max: 25, step: 1 } }
  },
};

const Template = ({
  backgroundColor,
  fillColor,
  needleColor,
  offsetLeft,
  offsetTop,
  padding,
  radius,
  strokeColor,
  strokeWidth
}) => {
  const App = SVG().size("100%", "100%");

  const knob = new Knob(App, {
    backgroundColor: rgb2hex(backgroundColor).hex,
    fillColor: rgb2hex(fillColor).hex,
    needleColor: rgb2hex(needleColor).hex,
    offsetLeft,
    offsetTop,
    padding,
    radius,
    strokeColor: rgb2hex(strokeColor).hex,
    strokeWidth
  });

  knob.append();

  knob.onValueChange = ({ detail }) => action("onValueChange")(detail.value);

  return App.node;
};

export const Default = Template.bind({});

Default.args = {
  backgroundColor: "#ccc",
  fillColor: "#fff",
  needleColor: "#f00",
  offsetLeft: 0,
  offsetTop: 0,
  padding: 10,
  radius: 100,
  strokeColor: "#111",
  strokeWidth: 10
};
