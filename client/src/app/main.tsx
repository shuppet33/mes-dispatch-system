import {type FC} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/reset.css'
import {AppRouter} from "./router";
import {reatomComponent, reatomContext} from '@reatom/npm-react'
import {reatomCtx} from "../shared/reatom-context";
import {reatomResource} from "@reatom/framework";
import {tokenAtom, useNameAtom} from "../entities/auth/model.ts";
import {api} from "../shared/api-service/instance.ts";

const getUserResource = reatomResource((ctx) => {
    const token = ctx.spy(tokenAtom)

    return ctx.schedule(async () => {
        const user = await api.get('/user', {
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        useNameAtom(ctx, user.data.username)
    })
})

const AuthProvider: FC<{ children: React.ReactNode }> = reatomComponent(({ctx, children}) => {
    const user = ctx.spy(getUserResource)
    

    console.log('LOOOG AuthProvider', user)
    

    return <>{children}</>;
})


createRoot(document.getElementById('root')!).render(
    <reatomContext.Provider value={reatomCtx}>
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
    </reatomContext.Provider>
)
