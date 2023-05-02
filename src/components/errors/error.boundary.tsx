import { PropsWithChildren } from 'react'
import { Component, ReactElement, createContext, useContext } from 'react'

const EBContext = createContext<{ error: unknown }>({ error: null })

export const useErrorBoundary = () => useContext(EBContext).error

type ErrorBoundaryProps =
  | {
      fallback: ReactElement
      onError?: (error: unknown) => void | ReactElement
    }
  | {
      fallback?: ReactElement
      onError: (error: unknown) => void | ReactElement
    }

interface ErrorBoundaryState {
  error?: null | unknown
  fallback?: ReactElement
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  state: ErrorBoundaryState = {}

  componentDidCatch(error: unknown) {
    const { fallback, onError } = this.props
    if (this.state.error) throw error

    const realFallback = onError?.(error) ?? fallback

    this.setState({ error, fallback: realFallback })
  }

  renderError() {
    const { error, fallback } = this.state
    return fallback ? <EBContext.Provider value={{ error }}>{fallback}</EBContext.Provider> : null
  }

  render() {
    const { children } = this.props
    const { error } = this.state

    return error ? this.renderError() : children
  }
}
