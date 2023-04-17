import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const BodyLayout: FC = () => {
  return (
    <div>
      body layout <br />
      <Outlet />
    </div>
  )
}
