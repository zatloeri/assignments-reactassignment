import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Cross1Icon, Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

const meta = {
    title: "Form/Button",
    component: Button,
    argTypes: {
        children: { description: "Content of the button (most probably a icon)" },
        colorScheme: { defaultValue: "safe" },
    },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const AddButton: Story = {
    args: {
        children: [<PlusIcon />],
    },
};

export const EditButton: Story = {
    args: {
        children: [<Pencil1Icon />],
    },
};

export const DeleteButton: Story = {
    args: {
        colorScheme: "unsafe",
        children: [<TrashIcon />],
    },
};

export const CancelButton: Story = {
    args: {
        colorScheme: "warn",
        children: [<Cross1Icon />],
    },
};
