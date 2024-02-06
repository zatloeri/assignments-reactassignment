import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`;

export const List: React.FC<PropsWithChildren> = ({ children }) => <StyledList>{children}</StyledList>;
