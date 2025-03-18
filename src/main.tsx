import { Provider as ChakraProvider } from '@/components/ui/provider'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from './ErrorBoundary'
import { routeTree } from './routeTree.gen'
import './index.css'

const queryClient = new QueryClient()
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <ChakraProvider forcedTheme="dark">
                        <RouterProvider router={router} />
                    </ChakraProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </StrictMode>
    )
}
