import { ExchangeRate, ExchangeRates } from '@/types.ts'

export const parseExchangeRates = (data: string): ExchangeRates => {
    // Split text into lines and filter empty ones
    const lines = data
        .trim()
        .split('\n')
        .filter((line) => line.trim())

    // Find data section (after first line containing '|')
    const dataIndex = lines.findIndex((line) => line.includes('|'))
    if (dataIndex === -1 || dataIndex === lines.length - 1) throw new Error('No data section found')

    // Extract headers and data lines
    const headers = lines[dataIndex].split('|').map((h) => h.trim().toLowerCase())
    const dataLines = lines.slice(dataIndex)

    // Type conversion map
    const typeConverters: { [key: string]: (v: string) => string | number } = {
        amount: (v: string) => parseInt(v),
        rate: (v: string) => parseFloat(v),
        code: (v: string) => v,
    }

    // Parse each line into an object
    const result: { [key: string]: ExchangeRate } = {}
    for (const line of dataLines.slice(1)) {
        const values = line.split('|').map((v) => v.trim())
        const obj: Partial<ExchangeRate> = {}

        headers.forEach((header, index) => {
            const converter = typeConverters[header] || ((v: string) => v)
            obj[header as keyof ExchangeRate] = converter(values[index]) as never
        })

        const code = obj.code
        if (code) result[code] = obj as ExchangeRate
    }

    return result
}
