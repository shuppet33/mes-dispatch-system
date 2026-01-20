import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet, redirect,
    RouterProvider
} from '@tanstack/react-router'

import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {AuthorizationPage} from "../pages/auth";
import {reatomCtx} from "../shared/reatom-context";
import {isAuthAtom} from "../shared/auth/model.ts";

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <nav>
                <Link to='/login'>Auth</Link>
            </nav>
            <Outlet/>
            <TanStackRouterDevtools/>
        </>
    ),
})

export const protectedLayout = createRoute({
    getParentRoute: () => rootRoute,
    id: 'protected',
    beforeLoad: (ctx) => {
        if (!reatomCtx.get(isAuthAtom)) {
            throw redirect({
                to: '/login',
                search: { redirect: ctx.location.href },
            });
        }
    }
})

const mainRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>главная</div>
})

const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: AuthorizationPage,
})

const dashboardRoute = createRoute({
    getParentRoute: () => protectedLayout,
    path: '/dashboard',
    component: () => <div>админ дашбоард</div>
})

protectedLayout.addChildren([dashboardRoute]);

rootRoute.addChildren([protectedLayout, authRoute, mainRoute]);

export const router = createRouter({ routeTree: rootRoute })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export const AppRouter = () => <RouterProvider router={router}/>
