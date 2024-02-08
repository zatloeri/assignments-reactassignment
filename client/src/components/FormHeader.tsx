import React, { useCallback } from "react";
import { StyledHeader } from "./Header";
import { Form, FormProps } from "./form/Form";

export type FormHeaderProps = {
    children: React.ReactNode;
    handleItemSubmit: (data: { title: string }) => void;
    onItemAddCancel: () => void;
};

export const FormHeader: React.FC<FormHeaderProps> = ({ onItemAddCancel, handleItemSubmit, children }) => {
    const handleFormSubmit = useCallback<FormProps["handleSubmit"]>(
        (title) => {
            handleItemSubmit({ title });
        },
        [handleItemSubmit]
    );

    return (
        <StyledHeader>
            <h1>{children}</h1>
            <Form initialValue="New item" handleSubmit={handleFormSubmit} handleCancel={onItemAddCancel}></Form>
        </StyledHeader>
    );
};
