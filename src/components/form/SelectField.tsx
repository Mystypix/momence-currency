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
        <Field.Root invalid={!!errors[name]}>
            {label && <Field.Label>{label}</Field.Label>}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select.Root
                        collection={options}
                        defaultValue={[field.value]}
                        name={field.name}
                        onInteractOutside={() => field.onBlur()}
                        onValueChange={({ value }) => field.onChange(value)}
                        value={field.value}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder={field.value || placeholder} />
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
                                            {option.name}
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
