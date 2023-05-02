import { RouterProvider, createHashRouter } from 'react-router-dom'
import { ScreenLoading } from '../../ui/loading/screen.ui'
import { MainWrapperUi } from './ui'
import { MainChat } from './components/chat'

const router = createHashRouter([
  {
    path: '/',
    children: [
      {
        path: '_/:postId',
        lazy: () => import('./components/post').then(({ MainPost: Component }) => ({ Component })),
      },
    ],
  },
])

const Main = () => {
  return (
    <MainWrapperUi>
      <RouterProvider router={router} fallbackElement={<ScreenLoading />} />
    </MainWrapperUi>
  )
}

export { Main }
