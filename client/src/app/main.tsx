import {createRoot} from 'react-dom/client'
import {AppRouter} from "./router";
import {reatomContext} from '@reatom/npm-react'
import {reatomCtx} from "../shared/reatom-context";
import {accessTokenAtom, isAuthAtom} from "../shared/auth/model.ts";
import {api} from "../shared/api/instance.ts";

import '../shared/ui/reset.css'
import '../shared/ui/main.css'


const initApp = async () => {
    try {
        const res = await api.post('/refresh');
        isAuthAtom(reatomCtx, true)
        accessTokenAtom(reatomCtx, res.data.accessToken)
    } catch (e) {
        console.error('Session not restored')
    }

    createRoot(document.getElementById('root')!).render(
        <reatomContext.Provider value={reatomCtx}>
            <AppRouter/>
        </reatomContext.Provider>
    )
}

initApp()