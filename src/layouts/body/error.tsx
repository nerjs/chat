import { FC } from 'react'
import { useRouteError } from 'react-router-dom'

export const BodyError: FC = () => {
  const error = useRouteError() as Error

  console.error(error)
  return (
    <div>
      error (body)
      <br />
      {error?.message}
    </div>
  )
}
