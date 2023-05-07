import { Route } from '@tanstack/react-router'
import MainRouteLayout from './components/main.layout'
import { rootRoute } from './root.route'

// const mainLayout = new Route({
//   id: 'main-layout',
//   getParentRoute: () => rootRoute,
//   component: MainRouteLayout,
// })

export const mainRoute = new Route({
  path: '/',
  getParentRoute: () => rootRoute,
  component: () => <b>1</b>,
})

export const mainRouteTree = mainRoute.addChildren([])
