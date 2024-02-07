import { useCallback, useEffect, useState } from "react";
import { ListItem, ListItemProps } from "../components/ListItem";
import { useMutation } from "react-query";
import { deleteTodoListItem, editTodoListItem } from "../api/items";
import { Form } from "../components/form";
import { FormProps } from "../components/form/types";
import { CheckboxProps } from "@radix-ui/react-checkbox";

interface TodoListItemProps extends Pick<ListItemProps, "label"> {
    id: number;
    isChecked: boolean;
    onItemChange: () => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ label, id, onItemChange, isChecked }) => {
    const editItemMutation = useMutation({ mutationFn: editTodoListItem });
    const deleteItemMutation = useMutation({ mutationFn: deleteTodoListItem });
    const [isInEditMode, setIsInEditMode] = useState(false);

    const toggleEditMode = useCallback(() => {
        setIsInEditMode(!isInEditMode);
    }, [setIsInEditMode, isInEditMode]);

    const apiChangeItemTitle = useCallback<FormProps["handleSubmit"]>(
        (newTitle) => {
            if (newTitle === label) {
                return;
            }
            editItemMutation.mutate({ id, title: newTitle, done: false });
            toggleEditMode();
        },
        [editItemMutation, label, id]
    );

    const apiChangeItemCheckedState = useCallback<NonNullable<CheckboxProps["onCheckedChange"]>>(
        (newCheckedState) => {
            if (newCheckedState === "indeterminate" || newCheckedState === isChecked) {
                return;
            }
            editItemMutation.mutate({ id, title: label, done: newCheckedState });
        },
        [editItemMutation, label, id]
    );

    const apiDeleteItem = useCallback<ListItemProps["handleRemoval"]>(() => {
        deleteItemMutation.mutate({ id });
    }, [deleteItemMutation, id]);

    useEffect(() => {
        if (editItemMutation.isSuccess || deleteItemMutation.isSuccess) {
            onItemChange();
        }
    }, [editItemMutation.isSuccess, deleteItemMutation.isSuccess]);

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
