import {createRootRoute, createRoute, createRouter, Outlet, redirect, RouterProvider} from '@tanstack/react-router'

import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {AuthorizationPage} from "../pages/auth";
import {reatomCtx} from "../shared/reatom-context";
import {isAuthAtom, userRoleAtom} from "../shared/auth/model.ts";
import {AdminPages} from "../pages/admin";
import {ROLE_ROUTES} from "../shared/routes";
import type {Role} from "../shared/types/auth.ts";

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet/>
            <TanStackRouterDevtools/>
        </>
    ),
})

export const protectedLogin = createRoute({
    getParentRoute: () => rootRoute,
    id: 'protectedLogin',
    beforeLoad: (ctx) => {
        if (!reatomCtx.get(isAuthAtom)) {
            throw redirect({
                to: '/login',
                search: {redirect: ctx.location.href},
            });
        }
    }
})

export const protectedRole = createRoute({
    getParentRoute: () => protectedLogin,
    id: 'protectedRole',
    beforeLoad: (ctx) => {
        const role = reatomCtx.get(userRoleAtom);

        throw redirect({
            to: ROLE_ROUTES[role as Role] || '/login',
            search: {redirect: ctx.location.href},
        })
    }
})

const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: AuthorizationPage,
})

const adminRoute = createRoute({
    getParentRoute: () => protectedLogin,
    path: '/admin',
    component: AdminPages
})


rootRoute.addChildren([protectedLogin, authRoute]);

protectedLogin.addChildren([protectedRole]);

protectedRole.addChildren([adminRoute])

export const router = createRouter({routeTree: rootRoute})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export const AppRouter = () => <RouterProvider router={router}/>
