import React, { PropsWithChildren } from "react";
import { olive, grass, blackA, red } from "@radix-ui/colors";
import { ThemeProvider as ThemeProviderStyled } from "styled-components";
import { GlobalStyle } from "./Global";

const theme = {
    colors: {
        ...olive,
        ...grass,
        ...blackA,
        ...red
    },
} as const;

export type ThemeType = typeof theme;

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
    <ThemeProviderStyled theme={theme}>
        <GlobalStyle />
        {children}
    </ThemeProviderStyled>
);
