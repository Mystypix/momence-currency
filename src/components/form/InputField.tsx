import { Field, Input, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface InputFieldProps extends InputProps {
    label?: string
    name: string
}

export const InputField = ({ label, name, ...rest }: InputFieldProps) => {
    const { formState, register } = useFormContext()
    const { errors } = formState

    return (
        <Field.Root invalid={!!errors[name]}>
            {label && <Field.Label>{label}</Field.Label>}
            <Input {...register(name)} {...rest} />
            {errors[name] && <Field.ErrorText>{String(errors[name].message)}</Field.ErrorText>}
        </Field.Root>
    )
}
