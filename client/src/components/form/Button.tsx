import { ButtonHTMLAttributes } from "react";
import styled, { ThemeProps } from "styled-components";
import { ThemeType } from "../ThemeProvider";

export interface ButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children" | "type"> {
    colorScheme?: "unsafe" | "safe" | "warn";
}

const chooseButtonBackground = ({ theme, colorScheme }: ButtonProps & ThemeProps<ThemeType>) => {
    switch (colorScheme) {
        case "unsafe":
            return theme.colors.red9;
        case "warn":
            return theme.colors.blackA9;
        default:
            return theme.colors.grass9;
    }
};

const StyledButton = styled.button<ButtonProps>`
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid;
    border-color: ${({ theme }: ThemeProps<ThemeType>) => theme.colors.olive9};
    background-color: ${(props) => chooseButtonBackground(props)};
    color: #fff;
    width: 1.5625rem;
    height: 1.5625rem;
    margin: 0 0.15rem;
    svg {
        width: 75%;
        height: 75%;
    }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...buttonProps }) => {
    return <StyledButton {...buttonProps}>{children}</StyledButton>;
};
