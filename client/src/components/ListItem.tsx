import React from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./form/Button";

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
`;

const StyledLabel = styled.label`
    margin-left: 15px;
`;

export type ListItemProps = Pick<CheckboxProps, "onCheckedChange" | "checked"> & {
    label: string;
    handleEdit: () => void;
    handleRemoval: () => void;
};

export const ListItem: React.FC<ListItemProps> = ({ label, handleRemoval, handleEdit, ...checkboxProps }) => (
    <StyledListItemContainer>
        <Checkbox {...checkboxProps} />
        <StyledLabel>{label}</StyledLabel>
        <StyledActionButtons>
            <Button onClick={handleRemoval} colorScheme="unsafe">
                <TrashIcon />
            </Button>
            <Button onClick={handleEdit}>
                <Pencil1Icon />
            </Button>
        </StyledActionButtons>
    </StyledListItemContainer>
);
