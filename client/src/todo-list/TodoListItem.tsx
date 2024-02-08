import { useCallback, useEffect, useState } from "react";
import { ListItem, ListItemProps } from "../components/ListItem";
import { useMutation } from "react-query";
import { deleteTodoListItem, editTodoListItem, markTodoListItemDone } from "../api/items";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Form, FormProps } from "../components/form/Form";

interface TodoListItemProps extends Pick<ListItemProps, "label"> {
    id: number;
    isChecked: boolean;
    onItemChange: () => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ label, id, onItemChange, isChecked }) => {
    const editItemMutation = useMutation({ mutationFn: editTodoListItem });
    const markDoneMutation = useMutation({ mutationFn: markTodoListItemDone });
    const deleteItemMutation = useMutation({ mutationFn: deleteTodoListItem });
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
        [editItemMutation, label, id, isChecked]
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

    useEffect(() => {
        if (editItemMutation.isSuccess || deleteItemMutation.isSuccess || markDoneMutation.isSuccess) {
            onItemChange();
        }
    }, [editItemMutation.isSuccess, deleteItemMutation.isSuccess, markDoneMutation.isSuccess]);

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
    return ListItemToShow;
};
