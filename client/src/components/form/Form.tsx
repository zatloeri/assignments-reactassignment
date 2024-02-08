import { useState } from "react";
import styled from "styled-components";
import { Input, InputProps } from "./Input";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./Button";

const StyledForm = styled.form`
    display: flex;
`;

export interface FormProps extends Pick<InputProps, "initialValue"> {
    handleSubmit: (itemLabel: string) => void;
    handleCancel: () => void;
}

export const Form = (props: FormProps): JSX.Element => {
    const [data, setData] = useState(props.initialValue);

    return (
        <StyledForm
            onSubmit={(e) => {
                e.preventDefault();
                props.handleSubmit(data);
            }}
            onReset={() => {
                props.handleCancel();
            }}
        >
            <Input initialValue={props.initialValue} handleInputChange={(value: string) => setData(value)} />
            <Button type={"submit"}>
                <CheckIcon />
            </Button>
            <Button type={"reset"} colorScheme="warn">
                <Cross1Icon />
            </Button>
        </StyledForm>
    );
};
