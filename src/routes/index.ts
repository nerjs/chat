import { Router } from '@tanstack/react-router'
import { rootRoute } from './root.route'
import { mainRouteTree } from './main.routes'
export * from './main.routes'

const routeTree = rootRoute.addChildren([mainRouteTree])
export const router = new Router({ routeTree })

declare module '@tanstack/router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

export { rootRoute }
