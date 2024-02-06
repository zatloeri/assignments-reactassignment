import React from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

const StyledListItemContainer = styled.div`
    margin: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
`;

const StyledActionButtons = styled.div`
    margin-left: auto;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    ${StyledListItemContainer}:hover & {
        opacity: 1;
        visibility: visible;
    }
    button {
        margin: 0 0.15rem;
        display: inline-flex;
        vertical-align: middle;
        padding: 0.25rem 0.25rem;
    }
`;

const StyledLabel = styled.label`
    margin-left: 15px;
`;

export type LiteItemProp = CheckboxProps & {
    label: string;
    handleEdit: () => void;
    handleRemoval: () => void;
};

export const ListItem: React.FC<LiteItemProp> = ({ label, handleRemoval, handleEdit, ...checkboxProps }) => (
    <StyledListItemContainer>
        <Checkbox {...checkboxProps} />
        <StyledLabel>{label}</StyledLabel>
        <StyledActionButtons>
            <button onClick={() => handleEdit()}>
                <TrashIcon />
            </button>
            <button onClick={() => handleRemoval()}>
                <Pencil1Icon />
            </button>
        </StyledActionButtons>
    </StyledListItemContainer>
);
