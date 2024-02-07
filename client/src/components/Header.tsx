import React from "react";
import styled from "styled-components";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./form/Button";

export type HeaderProps = {
    children: React.ReactNode;
    handleAddItem: () => void;
};

export const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Header: React.FC<HeaderProps> = ({ handleAddItem, children }) => {
    return (
        <StyledHeader>
            <h1>{children}</h1>
            <Button onClick={handleAddItem}>
                <PlusIcon />
            </Button>
        </StyledHeader>
    );
};
