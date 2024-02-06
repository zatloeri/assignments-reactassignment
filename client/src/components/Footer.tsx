import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
`;

export type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer: React.FC<FooterProps> = ({ todoItems, doneItems }) => (
    <StyledFooter>
        Todo: {todoItems || 0}
        Done: {doneItems || 0}
    </StyledFooter>
);
