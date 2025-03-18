import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useApiQuery = (
    options: UseQueryOptions
) => {
    const baseUrl =
        '/api/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing'
    const { queryKey } = options

    return useQuery({
        ...options,
        queryKey: [baseUrl, queryKey],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/${queryKey}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return response.text()
        },
    })
}
