import { Outlet } from '@tanstack/react-router'
import { FC, Suspense, lazy } from 'react'
import { MainWrapperUi } from '../../ui/block.ui'

const TanStackRouterDevtools = process.env.NODE_ENV === 'production' ? () => null : lazy(() => import('./devtools'))

const RootRouteLayout: FC = () => {
  return (
    <MainWrapperUi>
      <Outlet />
      <Suspense fallback={<b>111</b>}>
        <TanStackRouterDevtools />
      </Suspense>
    </MainWrapperUi>
  )
}

export default RootRouteLayout
