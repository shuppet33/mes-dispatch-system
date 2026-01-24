import {reatomAsync} from "@reatom/framework";
import {accessTokenAtom, isAuthAtom} from '../../shared/auth/model.ts'
import {login, logout} from "../../shared/api/auth.ts";

export const getTokenAuthAsync = reatomAsync((ctx, payload: { login: string; password: string }) => {
    return ctx.schedule(async () => {
        try {
            const res = await login(payload);
            accessTokenAtom(ctx, res.accessToken);
            isAuthAtom(ctx, true);

            return res;
        } catch (error) {
            console.error('Login failed', error);
        }
    })
}, 'getTokenAuthAsync')

export const logOutAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        try {
            await logout()
        } catch (error) {
            console.log('LogOut failed', error)
        }
    })
})