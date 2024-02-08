import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input``;


export type InputProps = {
    handleInputChange: (value: string) => void;
    initialValue: string;
};

export const Input = (props: InputProps): JSX.Element => {
    const [value, setValue] = useState(props.initialValue);

    return (
        <StyledInput
            value={value}
            onChange={(e) => {
                const value = e.currentTarget.value;
                setValue(value);
                props.handleInputChange(value);
            }}
        />
    );
};
