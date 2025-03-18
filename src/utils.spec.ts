import { describe, expect, it } from 'vitest'
import { parseExchangeRates } from './utils'
import { ExchangeRates } from './types'

describe('parseExchangeRates', () => {
    it('should parse exchange rates correctly', () => {
        const data = `
            code | amount | rate
            USD  | 1      | 22.5
            EUR  | 1      | 25.0
        `

        const expected: ExchangeRates = {
            USD: { code: 'USD', amount: 1, rate: 22.5 },
            EUR: { code: 'EUR', amount: 1, rate: 25.0 },
        }

        const result = parseExchangeRates(data)
        expect(result).toEqual(expected)
    })

    it('should throw an error if no data section is found', () => {
        const data = `
            code | amount | rate
        `

        expect(() => parseExchangeRates(data)).toThrow('No data section found')
    })

    it('should handle empty lines and trim spaces', () => {
        const data = `
            code | amount | rate

            USD  | 1      | 22.5

            EUR  | 1      | 25.0
        `

        const expected: ExchangeRates = {
            USD: { code: 'USD', amount: 1, rate: 22.5 },
            EUR: { code: 'EUR', amount: 1, rate: 25.0 },
        }

        const result = parseExchangeRates(data)
        expect(result).toEqual(expected)
    })
})
