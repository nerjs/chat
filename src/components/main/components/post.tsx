import { FC } from 'react'
import { Link } from 'react-router-dom'

const MainPost: FC = () => {
  return (
    <div>
      post
      <br />
      <Link to="/rrr">to chat</Link>
    </div>
  )
}

export { MainPost }
