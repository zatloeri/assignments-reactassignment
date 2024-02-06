import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 0.75rem 0;
`;

export const List: React.FC<PropsWithChildren> = ({ children }) => <StyledList>{children}</StyledList>;
