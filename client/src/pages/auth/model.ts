import {reatomAsync} from "@reatom/framework";
import {isAuthAtom, accessTokenAtom} from '../../shared/auth/model.ts'
import {login} from "../../shared/api/auth.ts";

export const getTokenAuthAsync = reatomAsync((ctx, payload: { login: string; password: string }) => {
    return ctx.schedule(async () => {
        try {
            const res = await login(payload);

            accessTokenAtom(ctx, res.accessToken);
            isAuthAtom(ctx, true);
        } catch (error) {
            console.error('Login failed', error);
        }
    })
}, 'getTokenAuthAsync')