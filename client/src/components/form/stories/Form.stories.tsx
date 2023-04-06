import { Meta, StoryObj } from "@storybook/react";
import { Form } from "../Form";

const meta = {
    title: "Form/Form",
    component: Form,
    argTypes: {
        handleCancel: { action: "cancelled" },
        handleSubmit: { action: "submitted" },
    },
} as Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
    args: {
        initialValue: "",
    },
};
