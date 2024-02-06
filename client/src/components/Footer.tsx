import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
`;

const StyledFooterLine = styled.div`
    width: 100%;
    padding: 0.25rem 0;
`;

export type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer: React.FC<FooterProps> = ({ todoItems, doneItems }) => (
    <StyledFooter>
        <StyledFooterLine>Todo: {todoItems || 0}</StyledFooterLine>
        <StyledFooterLine>Done: {doneItems || 0}</StyledFooterLine>
    </StyledFooter>
);
