import { createHashRouter } from 'react-router-dom'
import { BodyError } from './layouts/body/error'
import { BodyLayout } from './layouts/body/layout'

export const routes = createHashRouter([
  {
    path: '/',
    errorElement: <BodyError />,
    element: <BodyLayout />,
    children: [
      {
        errorElement: <BodyError />,
        index: true,
        element: <>HomePage </>,
      },
    ],
  },
])
