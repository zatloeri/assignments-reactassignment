import { useCallback, useState } from "react";
import { ListItem, ListItemProps } from "../components/ListItem";
import { useMutation } from "react-query";
import { DeleteItemData, EditItemData, deleteTodoListItem, editTodoListItem, markTodoListItemDone } from "../api/items";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Form, FormProps } from "../components/form/Form";
import { useMutationSuccessEffect } from "../react-query/resultHandlingHooks";
import {StyledListItemContainer} from "../components/ListItemContainer";

interface TodoListItemProps extends Pick<ListItemProps, "label"> {
    id: number;
    isChecked: boolean;
    onItemChange: (params: EditItemData) => void;
    onItemDelete: (params: DeleteItemData) => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ label, id, onItemChange, onItemDelete, isChecked }) => {
    const editItemMutation = useMutation({ mutationKey: ["editTodoItem"], mutationFn: editTodoListItem });
    const markDoneMutation = useMutation({ mutationKey: ["markDoneTodoItem"], mutationFn: markTodoListItemDone });
    const deleteItemMutation = useMutation({ mutationKey: ["deleteTodoItem"], mutationFn: deleteTodoListItem });
    const [isInEditMode, setIsInEditMode] = useState(false);

    const toggleEditMode = useCallback(() => {
        setIsInEditMode(!isInEditMode);
    }, [setIsInEditMode, isInEditMode]);

    const apiChangeItemTitle = useCallback<FormProps["handleSubmit"]>(
        (newTitle) => {
            toggleEditMode();
            if (newTitle === label) {
                return;
            }
            editItemMutation.mutate({ id, title: newTitle, done: isChecked });
        },
        [toggleEditMode, label, editItemMutation, id, isChecked]
    );

    const apiChangeItemCheckedState = useCallback<NonNullable<CheckboxProps["onCheckedChange"]>>(
        (newCheckedState) => {
            if (newCheckedState === "indeterminate" || newCheckedState === isChecked) {
                return;
            }
            if (newCheckedState === true) {
                markDoneMutation.mutate({ id });
                return;
            }
            editItemMutation.mutate({ id, title: label, done: newCheckedState });
        },
        [editItemMutation, markDoneMutation, label, id, isChecked]
    );

    const apiDeleteItem = useCallback<ListItemProps["handleRemoval"]>(() => {
        deleteItemMutation.mutate({ id });
    }, [deleteItemMutation, id]);

    useMutationSuccessEffect(markDoneMutation, () => onItemChange({ id, done: true }));
    useMutationSuccessEffect(deleteItemMutation, onItemDelete);
    useMutationSuccessEffect(editItemMutation, onItemChange);

    const ListItemToShow = isInEditMode ? (
        <Form handleSubmit={apiChangeItemTitle} handleCancel={toggleEditMode} initialValue={label} />
    ) : (
        <ListItem
            key={id}
            label={label}
            handleEdit={toggleEditMode}
            handleRemoval={apiDeleteItem}
            onCheckedChange={apiChangeItemCheckedState}
            checked={isChecked}
        />
    );
    return <StyledListItemContainer>{ListItemToShow}</StyledListItemContainer>;
};
