import { createHashRouter } from 'react-router-dom'
import { lazy } from 'react'
import { SkeletonContentLoading } from '../../ui/loading/skeleton.content.ui'
import { CoreAppError } from './modules/core/error'

const MainLayout = lazy(() => import('./modules/main').then(({ MainAppLayout }) => ({ default: MainAppLayout })))

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <CoreAppError />,
    children: [
      {
        index: true,
        element: <SkeletonContentLoading />,
      },
    ],
  },
])
