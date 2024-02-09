import React, { useCallback, useState } from "react";
import { Header, HeaderProps } from "../components/Header";
import { useMutation } from "react-query";
import { NewItemData, addTodoListItem } from "../api/items";
import { FormHeader, FormHeaderProps } from "../components/FormHeader";
import { useMutationSuccessEffect } from "../react-query/resultHandlingHooks";

export type TodoListHeaderProps = {
    children: React.ReactNode;
    onNewItemAdd: (data: NewItemData) => void;
};

export const TodoListHeader: React.FC<TodoListHeaderProps> = ({ children, onNewItemAdd }) => {
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const addItemMutation = useMutation({ mutationFn: addTodoListItem });

    const toggleAddNewItemForm = useCallback<HeaderProps["handleAddItem"]>(() => {
        setIsAddingNewItem(!isAddingNewItem);
    }, [setIsAddingNewItem, isAddingNewItem]);

    const apiAddItem = useCallback<FormHeaderProps["handleItemSubmit"]>(
        (data) => {
            addItemMutation.mutate(data);
            toggleAddNewItemForm();
        },
        [addItemMutation, toggleAddNewItemForm]
    );

    useMutationSuccessEffect(addItemMutation, onNewItemAdd);

    const HeaderComponent = isAddingNewItem ? (
        <FormHeader handleItemSubmit={apiAddItem} onItemAddCancel={toggleAddNewItemForm}>
            {children}
        </FormHeader>
    ) : (
        <Header handleAddItem={toggleAddNewItemForm}>{children}</Header>
    );

    return HeaderComponent;
};
