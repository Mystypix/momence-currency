import {createListCollection} from '@chakra-ui/react'
import {Content, Form, Logo, NumberInputs, Result, Title} from '@/pages/Converter.styles.ts'
import {FormProvider, useForm} from 'react-hook-form'
import {useApiQuery} from '../api/hooks'
import {SelectField} from '../components/form/SelectField'
import {parseExchangeRates} from '../utils'
import logoSrc from '../assets/logo.svg'
import {InputField} from "@/components/form/InputField.tsx";

interface FormValues {
    amount: number
    currency: string
    decimalPrecision: number
}

export const Converter = () => {
    const { data, error, isLoading } = useApiQuery('daily.txt', {
        select: (rawData) => parseExchangeRates(rawData as string),
    })

    const methods = useForm<FormValues>({
        defaultValues: {
            amount: 0,
            currency: 'USD',
            decimalPrecision: 2,
        },
        mode: 'onChange',
    })

    const { watch } = methods

    const selectedAmount = watch('amount')
    const selectedCurrency = watch('currency')
    const decimalPrecision = watch('decimalPrecision')

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    const currencies = Object.keys(data)
    const currencyOptions = createListCollection({
        items: currencies.map((currency) => ({ name: currency, value: currency })),
    })

    return (
        <Content>
            <Logo src={logoSrc} alt="Momence logo" />
            <Title>Momence currency</Title>
            <FormProvider {...methods}>
                <Form>
                    <InputField label="Amount (in CZK)" name="amount" type="number" />
                    <SelectField label="Currency" name="currency" options={currencyOptions} />
                    <InputField label="Decimal precision" name="decimalPrecision" type="number" />
                </Form>
            </FormProvider>
            <Result>
                <span>Result:</span>
                <strong>
                    {(
                        (selectedAmount / data[selectedCurrency].rate) *
                        data[selectedCurrency].amount
                    ).toFixed(decimalPrecision)}
                </strong>
                <span>{selectedCurrency}</span>
            </Result>
        </Content>
    )
}
