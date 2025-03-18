import { Field, ListCollection, Portal, Select } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

interface SelectFieldProps {
    label?: string
    name: string
    options: ListCollection
    placeholder?: string
}

export const SelectField = ({ label, name, options, placeholder }: SelectFieldProps) => {
    const { control, formState } = useFormContext()
    const { errors } = formState

    return (
        <Field.Root invalid={!!errors[name]} width="320px">
            {label && <Field.Label>{label}</Field.Label>}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select.Root
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => field.onChange(value)}
                        onInteractOutside={() => field.onBlur()}
                        collection={options}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder={placeholder} />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {options.items.map((option) => (
                                        <Select.Item item={option} key={option.value}>
                                            {option.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                )}
            />
            {errors[name] && <Field.ErrorText>{String(errors[name].message)}</Field.ErrorText>}
        </Field.Root>
    )
}
