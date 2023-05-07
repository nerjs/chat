import { FC } from 'react'
import { StyleProvider } from './hooks/style/provider'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'

const App: FC = () => {
  return (
    <StyleProvider>
      <RouterProvider router={router} />
    </StyleProvider>
  )
}

export { App }
