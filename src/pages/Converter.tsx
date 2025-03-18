import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'
import { useApiQuery } from '../api/hooks'
import { InputField } from '../components/form/InputField'
import { SelectField } from '../components/form/SelectField'
import { parseExchangeRates } from '../utils'
import { createListCollection } from '@chakra-ui/react'
import logoSrc from '../assets/logo.svg'

interface FormValues {
    amount: number
    currency: string
    decimalPrecision: number
}

interface ExchangeRates {
    [key: string]: {
        rate: number
        amount: number
    }
}

export const Converter = () => {
    const { data, error, isLoading } = useApiQuery<ExchangeRates>('daily.txt', {
        select: (data: unknown) => parseExchangeRates(data as string),
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

    const currencies = Object.keys(data as ExchangeRates)
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
                        (selectedAmount / (data as ExchangeRates)[selectedCurrency].rate) *
                        (data as ExchangeRates)[selectedCurrency].amount
                    ).toFixed(decimalPrecision)}
                </strong>
                <span>{selectedCurrency}</span>
            </Result>
        </Content>
    )
}

const Title = styled.h1`
    font-size: 32px;
    line-height: 40px;
`

const Logo = styled.img`
    width: 200px;
`

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
    height: 100%;
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    gap: 30px;
`

const Result = styled.div`
    display: flex;
    gap: 5px;
    font-size: 24px;
    line-height: 32px;
`
