import { Meta, StoryObj } from "@storybook/react";
import { Layout } from "../Layout";

const meta = {
    title: "Layout",
    component: Layout,
} as Meta<typeof Layout>;
export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
    args: {
        children: [<div>Hypothetical item 1</div>, <div>Hypothetical item 2</div>, <div>Hypothetical item 3</div>],
    },
};
