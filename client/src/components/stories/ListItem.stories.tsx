import { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "../ListItem";

const meta = {
    title: "List Item",
    component: ListItem,
    argTypes: {
        forceHoverState: { defaultValue: false },
        handleRemoval: { action: "removed" },
        handleEdit: { action: "edited" },
    },
} as Meta<typeof ListItem>;
export default meta;
type Story = StoryObj<typeof ListItem>;

export const Idle: Story = {
    args: {
        label: "Lorem ipsum dolor",
        forceHoverState: false,
    },
};

export const Done: Story = {
    args: {
        ...Idle.args,
        checked: true,
    },
};

export const Hovered: Story = {
    args: {
        ...Idle.args,
        forceHoverState: true,
    },
};
