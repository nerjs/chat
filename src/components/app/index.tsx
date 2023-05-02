import { FC } from 'react'
import { StyleProvider } from '../../hooks/style/provider'
import { ApiProvider } from '../../hooks/api/provider'
import { AuthProvider } from '../../hooks/auth/provider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { MainWrapperUi } from '../main/ui'
import { CoreAppLoading } from './modules/core/loading'

const App: FC = () => {
  return (
    <StyleProvider>
      <ApiProvider>
        <AuthProvider>
          <MainWrapperUi>
            <RouterProvider router={router} fallbackElement={<CoreAppLoading />} />
          </MainWrapperUi>
        </AuthProvider>
      </ApiProvider>
    </StyleProvider>
  )
}

export { App }
