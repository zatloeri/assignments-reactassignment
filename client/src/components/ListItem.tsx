import React from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
`;

const StyledActionButtons = styled.div`
    margin-left: auto;
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
    <StyledDiv>
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
    </StyledDiv>
);
