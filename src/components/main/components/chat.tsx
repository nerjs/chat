import { FC } from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom'

const MainChat: FC = () => {
  return (
    <div>
      chat
      <br />
      <Link to="/_/test/123">to post</Link> <Link to="/first">to first</Link> <Link to="/second">to second</Link>
      <hr />
      <Outlet />
    </div>
  )
}

export { MainChat }
