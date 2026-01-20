import axios from 'axios'
import {reatomCtx} from "../reatom-context";
import {tokenAtom} from "../../entities/auth/model.ts";

export const api = axios.create({
    baseURL: '/api/v1'
})

api.interceptors.request.use((config) => {
    const token = reatomCtx.get(tokenAtom)

    if (!token) return config

    return{
        ...config.headers,
        headers: {...config, Authorization: `Token ${token}`}
    }
})

api.interceptors.response.use(
    (config) => config,
    (error) => {
        const currentRequest = error.config
        console.log('LOOOG api.response', currentRequest)
    }
)


