import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useApiQuery = (options: UseQueryOptions) => {
    const baseUrl = import.meta.env.MODE === 'development' ? '/api/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt' : '/.netlify/functions/cnb-proxy'
    const { queryKey } = options

    return useQuery({
        ...options,
        queryKey: [baseUrl, queryKey],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return response.text()
        },
    })
}