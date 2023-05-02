import { FC } from 'react'
import { Link } from 'react-router-dom'

const MainUser: FC = () => {
  return (
    <div>
      user
      <br />
      <Link to="/rrr">to chat</Link>
    </div>
  )
}

export { MainUser }
