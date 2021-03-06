import { SVG } from "@svgdotjs/svg.js";
import rgb2hex from "rgb2hex";
import { Label } from "../src/";

export default {
  title: 'SVG Audio Controls/Label',
  argTypes: {
    fontColor: { control: { type: "color" } },
    fontSize: { control: { type: "range", min: 8, max: 32, step: 1 } },
    offsetLeft: { control: { type: "range", min: 0, max: 50, step: 1 } },
    offsetTop: { control: { type: "range", min: 0, max: 50, step: 1 } },
  },
};

const Template = ({
  defaultText,
  fontColor,
  fontFamily,
  fontSize,
  offsetLeft,
  offsetTop,
}) => {
  const App = SVG().size("100%", "100%");

  const label = new Label(App, {
    defaultText,
    fontColor: rgb2hex(fontColor).hex,
    fontFamily,
    fontSize,
    offsetLeft,
    offsetTop
  });

  label.append();

  return App.node;
};

export const Default = Template.bind({});

Default.args = {
  defaultText: "0.00",
  fontColor: "#f70",
  fontFamily: "Roboto",
  fontSize: 22,
  offsetLeft: 0,
  offsetTop: 0
};
