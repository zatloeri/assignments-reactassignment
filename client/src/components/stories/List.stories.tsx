import { Meta, StoryObj } from "@storybook/react";

import { List } from "../List";
import { ListItem, LiteItemProp } from "../ListItem";
import { action } from "@storybook/addon-actions";

const meta = {
    title: "List",
    component: List,
} as Meta<typeof List>;
export default meta;

type Story = StoryObj<typeof ListItem>;

const emptyHandlers: Pick<LiteItemProp, "handleEdit" | "handleRemoval"> = {
    handleRemoval: action("Removal requested"),
    handleEdit: action("Edit requested"),
};

export const WithItems: Story = {
    args: {
        children: [
            <ListItem {...emptyHandlers} label={"Lorem ipsum dolor"} />,
            <ListItem {...emptyHandlers} label={"Nullam Adipiscing Ridiculus Fusce"} />,
            <ListItem {...emptyHandlers} label={"Mattis Tristique Parturient "} />,
        ],
    },
};
