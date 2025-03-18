export interface ExchangeRate {
    amount: number
    rate: number
    code: string
}

export interface ExchangeRates {
    [key: string]: ExchangeRate
}
