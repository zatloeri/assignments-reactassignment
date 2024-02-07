import React, { useCallback, useEffect, useState } from "react";
import { Header, HeaderProps } from "../components/Header";
import { useMutation } from "react-query";
import { addTodoListItem } from "../api/items";
import { FormHeader, FormHeaderProps } from "../components/FormHeader";

export type TodoListHeaderProps = {
    children: React.ReactNode;
    onNewItemAdd: () => void;
};

export const TodoListHeader: React.FC<TodoListHeaderProps> = ({ children, onNewItemAdd }) => {
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const addItemMutation = useMutation({ mutationFn: addTodoListItem });

    const apiAddItem = useCallback<FormHeaderProps["handleItemSubmit"]>(
        (data) => {
            addItemMutation.mutate(data);
            toggleAddNewItemForm();
        },
        [addItemMutation]
    );

    const toggleAddNewItemForm = useCallback<HeaderProps["handleAddItem"]>(() => {
        setIsAddingNewItem(!isAddingNewItem);
    }, [setIsAddingNewItem, isAddingNewItem]);

    useEffect(() => {
        if (addItemMutation.isSuccess) {
            onNewItemAdd();
        }
    }, [addItemMutation.isSuccess]);

    const HeaderComponent = isAddingNewItem ? (
        <FormHeader handleItemSubmit={apiAddItem} onItemAddCancel={toggleAddNewItemForm}>
            {children}
        </FormHeader>
    ) : (
        <Header handleAddItem={toggleAddNewItemForm}>{children}</Header>
    );

    return HeaderComponent;
};
