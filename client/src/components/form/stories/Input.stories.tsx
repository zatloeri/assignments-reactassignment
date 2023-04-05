import { Meta, StoryObj } from "@storybook/react";
import { Input } from "../Input";

const meta = {
    title: "Form/Input",
    component: Input,
} as Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        initialValue: "",
    },
};
export const WithInitialValue: Story = {
    args: {
        initialValue: "Lorem ipsum",
    },
};
