import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { PlusIcon } from "@radix-ui/react-icons";
import { Form } from "./form";

export type HeaderProps = {
    children: React.ReactNode;
    handleAddItem: (data: { title: string }) => void;
};

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.olive9};
        background-color: ${(props) => props.theme.colors.grass9};
        color: #fff;
        width: 1.5625rem;
        height: 1.5625rem;
        svg {
            width: 75%;
            height: 75%;
        }
    }
`;

export const Header: React.FC<HeaderProps> = ({ handleAddItem, children }) => {
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);

    const toggleAddNewItemForm = useCallback(() => {
        setIsAddingNewItem(!isAddingNewItem);
    }, [setIsAddingNewItem, isAddingNewItem]);

    const handleFormSubmit = useCallback(
        (title: string) => {
            handleAddItem({ title });
            toggleAddNewItemForm();
        },
        [handleAddItem]
    );

    const ButtonOrForm = isAddingNewItem ? (
        <Form initialValue="New item" handleSubmit={handleFormSubmit} handleCancel={toggleAddNewItemForm}></Form>
    ) : (
        <button onClick={toggleAddNewItemForm}>
            <PlusIcon />
        </button>
    );

    return (
        <StyledHeader>
            <h1>{children}</h1>
            {ButtonOrForm}
        </StyledHeader>
    );
};
