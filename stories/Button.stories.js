// import { createButton } from './Button';
import { SVG } from "@svgdotjs/svg.js";
import { action } from '@storybook/addon-actions';
import { Button } from "../src/";

export default {
  title: 'SVG Audio Controls/Button',
  argTypes: {
    // label: { control: 'text' },
    // primary: { control: 'boolean' },
    // backgroundColor: { control: 'color' },
    // size: {
    //   control: { type: 'select', options: ['small', 'medium', 'large'] },
    // },
    // onClick: { action: 'onClick' },

  },
};

const Template = (args) => {
  const App = SVG();

  const b1 = new Button(App, {
    backgroundColor: "#ccc",
    fillColor: "#fff",
    activeColor: "#0c0",
    offsetLeft: 0,
    offsetTop: 0,
    padding: 10,
    radius: 100,
    strokeColor: "#111",
    strokeWidth: 10
  });

  b1.append();

  b1.onValueChange = action('onValueChange');

  return App.node;
};

export const Default = Template.bind({});

// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
