import {createRootRoute, createRoute, createRouter, Link, Outlet, RouterProvider} from '@tanstack/react-router'

import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {AuthorizationPage} from "../../pages/authorization";

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <nav>
                <Link to='/auth'>Auth</Link>
            </nav>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
})

 const AuthorizationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: () => <AuthorizationPage/>
})

const routeTree = rootRoute.addChildren([AuthorizationRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export const AppRouter = () => <RouterProvider  router={router}/>
