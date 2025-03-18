import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState } from 'react';

export const useApiQuery = (queryKey: string, options?: UseQueryOptions) => {
    const [error, setError] = useState<Error | null>(null);

    const baseUrl =
        '/api/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing';

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/${queryKey}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.text();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to fetch data');
            setError(error);
            throw error;
        }
    };

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [baseUrl, queryKey],
        queryFn: fetchData,
        ...options,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};
