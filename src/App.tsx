import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './hooks/auth/provider'
import { DataProvider } from './providers/data.provider'
import { StyleProvider } from './providers/style.provider'
import { routes } from './routes'
import { BodyFallback } from './layouts/body/fallback'

function App() {
  return (
    <DataProvider>
      <StyleProvider>
        <AuthProvider>
          <RouterProvider router={routes} fallbackElement={<BodyFallback />} />
        </AuthProvider>
      </StyleProvider>
    </DataProvider>
  )
}

export default App
