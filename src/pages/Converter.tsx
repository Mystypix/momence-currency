import { useForm } from "react-hook-form"
import {useApiQuery} from "../api/hooks.ts";
import {InputField} from "../components/InputField.tsx";
import {SelectField} from "../components/SelectField.tsx";
import styled from "styled-components";

interface FormValues {
    amount: number;
    currency: string;
}

export const Converter = () => {
    const { data, error, isLoading } = useApiQuery('daily.txt');

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            amount: 0,
            currency: "USD",
        },
        mode: "onChange",
    })

    const onSubmit = (data: FormValues) => console.log(data)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Content>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputField control={control} label="Amount" name="amount" rules={{ required: true }} type="number" />
                <SelectField control={control} label="Currency" name="currency" rules={{ required: true }} />
            </Form>
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    gap: 30px;
`