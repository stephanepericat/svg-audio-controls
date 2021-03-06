import { SVG } from "@svgdotjs/svg.js";
import { action } from '@storybook/addon-actions';
import rgb2hex from "rgb2hex";
import { Button } from "../src/";

export default {
  title: 'SVG Audio Controls/Button',
  argTypes: {
    activeColor: { control: { type: "color" } },
    backgroundColor: { control: { type: "color" } },
    fillColor: { control: { type: "color" } },
    offsetLeft: { control: { type: "range", min: 0, max: 50, step: 1 } },
    offsetTop: { control: { type: "range", min: 0, max: 50, step: 1 } },
    padding: { control: { type: "range", min: 10, max: 50, step: 1 } },
    radius: { control: { type: "range", min: 50, max: 200, step: 1 } },
    strokeColor: { control: { type: "color" } },
    strokeWidth: { control: { type: "range", min: 1, max: 25, step: 1 } }
  },
};

const Template = ({
  activeColor,
  backgroundColor,
  fillColor,
  offsetLeft,
  offsetTop,
  padding,
  radius,
  strokeColor,
  strokeWidth
}) => {
  const App = SVG().size("100%", "100%");

  const b1 = new Button(App, {
    activeColor: rgb2hex(activeColor).hex,
    backgroundColor: rgb2hex(backgroundColor).hex,
    fillColor: rgb2hex(fillColor).hex,
    offsetLeft,
    offsetTop,
    padding,
    radius,
    strokeColor: rgb2hex(strokeColor).hex,
    strokeWidth
  });

  b1.append();

  b1.onValueChange = action('onValueChange');

  return App.node;
};

export const Default = Template.bind({});

Default.args = {
  activeColor: "#0c0",
  backgroundColor: "#ccc",
  fillColor: "#fff",
  offsetLeft: 0,
  offsetTop: 0,
  padding: 10,
  radius: 100,
  strokeColor: "#111",
  strokeWidth: 10
};
