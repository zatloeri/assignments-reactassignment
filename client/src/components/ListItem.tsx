import React from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./form/Button";
import { StyledListItemContainer } from "./ListItemContainer";

const buttonForcedShowStyles = `
    visibility: visible;
    opacity: 1;
`;

const buttonShowOnHoverStyles = `
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    ${StyledListItemContainer}:hover & {
        opacity: 1;
        visibility: visible;
    }
`;

const StyledActionButtons = styled.div`
    margin-left: auto;
    ${({ forceHoverState }: { forceHoverState?: boolean }) =>
        forceHoverState ? buttonForcedShowStyles : buttonShowOnHoverStyles}
`;

const StyledLabel = styled.label`
    margin-left: 15px;
`;

export type ListItemProps = Pick<CheckboxProps, "onCheckedChange" | "checked"> & {
    label: string | number;
    handleEdit: () => void;
    handleRemoval: () => void;
    forceHoverState?: boolean;
};

export const ListItem: React.FC<ListItemProps> = ({
    label,
    handleRemoval,
    handleEdit,
    forceHoverState,
    ...checkboxProps
}) => {
    return (
        <>
            <Checkbox {...checkboxProps} />
            <StyledLabel>{label}</StyledLabel>
            <StyledActionButtons forceHoverState={forceHoverState}>
                <Button onClick={handleRemoval} colorScheme="unsafe">
                    <TrashIcon />
                </Button>
                <Button onClick={handleEdit}>
                    <Pencil1Icon />
                </Button>
            </StyledActionButtons>
        </>
    );
};
