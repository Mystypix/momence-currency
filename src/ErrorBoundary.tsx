import { useState, useEffect, PropsWithChildren } from 'react'
import * as Sentry from '@sentry/react'

interface ErrorInfo {
    error: Error
    componentStack: string
    timestamp: string
}

export const ErrorBoundary = ({ children }: PropsWithChildren) => {
    const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null)

    const handleError = (error: Error) => {
        const eventId = Sentry.captureException(error)

        Sentry.showReportDialog({ eventId })

        setErrorInfo({
            error,
            componentStack: error.stack || '',
            timestamp: new Date().toISOString(),
        })
    }

    useEffect(() => {
        return () => {
            if (errorInfo?.error) {
                setErrorInfo(null)
            }
        }
    }, [errorInfo])

    try {
        if (errorInfo) {
            throw errorInfo.error
        }
        return children
    } catch (error) {
        handleError(error as Error)
        return (
            <div>
                <h2>Something went wrong.</h2>
                {import.meta.env.NODE_ENV === 'development' && (
                    <details>
                        <summary>Click for error details</summary>
                        <pre>{errorInfo?.componentStack}</pre>
                    </details>
                )}
            </div>
        )
    }
}
