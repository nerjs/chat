import { Outlet } from '@tanstack/react-router'
import { FC } from 'react'

const MainRouteLayout: FC = () => {
  return (
    <div>
      123 <br />
      <Outlet />
    </div>
  )
}

export default MainRouteLayout
