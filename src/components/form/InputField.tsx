import { Field, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface InputFieldProps extends Partial<HTMLInputElement> {
    label?: string
    name: string
}

export const InputField = ({ label, name, type }: InputFieldProps) => {
    const { formState, register } = useFormContext()
    const { errors } = formState

    return (
        <Field.Root invalid={!!errors[name]}>
            {label && <Field.Label>{label}</Field.Label>}
            <Input {...register(name)} type={type} />
            {errors[name] && <Field.ErrorText>{String(errors[name].message)}</Field.ErrorText>}
        </Field.Root>
    )
}
