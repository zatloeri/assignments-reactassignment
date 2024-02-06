import React from "react";
import styled from "styled-components";
import { PlusIcon } from "@radix-ui/react-icons";

export type HeaderProps = {
    children: React.ReactNode;
    handleAddItem: () => void;
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

export const Header: React.FC<HeaderProps> = ({ handleAddItem, children }) => (
    <StyledHeader>
        <h1>{children}</h1>
        <button onClick={handleAddItem}>
            <PlusIcon />
        </button>
    </StyledHeader>
);
