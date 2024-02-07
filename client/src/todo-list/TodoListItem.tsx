import { useCallback, useEffect, useState } from "react";
import { ListItem, ListItemProps } from "../components/ListItem";
import { useMutation } from "react-query";
import { deleteTodoListItem, editTodoListItem } from "../api/items";
import { Form } from "../components/form";
import { FormProps } from "../components/form/types";

interface TodoListItemProps extends Pick<ListItemProps, "label"> {
    id: number;
    onItemChange: () => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ label, id, onItemChange }) => {
    const editItemMutation = useMutation({ mutationFn: editTodoListItem });
    const deleteItemMutation = useMutation({ mutationFn: deleteTodoListItem });
    const [isInEditMode, setIsInEditMode] = useState(false);

    const toggleEditMode = useCallback(() => {
        setIsInEditMode(!isInEditMode);
    }, [setIsInEditMode, isInEditMode]);

    const apiEditItem = useCallback<FormProps["handleSubmit"]>(
        (newTitle) => {
            if (newTitle === label) {
                return;
            }
            editItemMutation.mutate({ id, title: newTitle, checked: false });
            toggleEditMode();
            onItemChange();
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
        <Form handleSubmit={apiEditItem} handleCancel={toggleEditMode} initialValue={label} />
    ) : (
        <ListItem key={id} label={label} handleEdit={toggleEditMode} handleRemoval={apiDeleteItem} />
    );
    return ListItemToShow;
};
