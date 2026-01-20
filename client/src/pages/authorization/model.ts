import {reatomAsync} from "@reatom/framework";
import {api} from "../../shared/api-service/instance.ts";
import {isAuthAtom, tokenAtom} from "../../entities/auth/model.ts";

export const getTokenAuthAsync = reatomAsync((ctx, payload: { login: string; password: string }) => {
    return ctx.schedule(async () => {
        const res = await api.post('/token-auth', {
            login: payload.login,
            password: payload.password
        })


        tokenAtom(ctx, res.data.token)
        isAuthAtom(ctx, true)
    })
}, 'getTokenAuthAsync')