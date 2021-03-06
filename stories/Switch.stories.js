import { SVG } from "@svgdotjs/svg.js";
import { action } from "@storybook/addon-actions";
import rgb2hex from "rgb2hex";
import { Switch } from "../src/";

export default {
  title: "SVG Audio Controls/Switch",
  argTypes: {
    backgroundColor: { control: { type: "color" } },
    offsetLeft: { control: { type: "range", min: 0, max: 50, step: 1 } },
    offsetTop: { control: { type: "range", min: 0, max: 50, step: 1 } },
    padding: { control: { type: "range", min: 10, max: 50, step: 1 } },
    size: { control: { type: "range", min: 10, max: 100, step: 1 } },
    steps: { control: { type: "range", min: 2, max: 10, step: 1 } },
    strokeColor: { control: { type: "color" } },
    switchColor: { control: { type: "color" } }
  },
};

const Template = ({
  backgroundColor,
  isHorizontal,
  offsetLeft,
  offsetTop,
  padding,
  size,
  steps,
  strokeColor,
  switchColor
}) => {
  const App = SVG().size("100%", "100%");

  const _switch = new Switch(App, {
    backgroundColor: rgb2hex(backgroundColor).hex,
    isHorizontal,
    offsetLeft,
    offsetTop,
    padding,
    size,
    steps,
    strokeColor: rgb2hex(strokeColor).hex,
    switchColor: rgb2hex(switchColor).hex,
  });

  _switch.append();

  _switch.onValueChange = ({ detail }) => action("onValueChange")(detail.value);

  return App.node;
};

export const Default = Template.bind({});

Default.args = {
  backgroundColor: "#535353",
  isHorizontal: true,
  offsetLeft: 0,
  offsetTop: 0,
  padding: 10,
  size: 20,
  steps: 3,
  strokeColor: "#181818",
  switchColor: "#cccccc"
};
