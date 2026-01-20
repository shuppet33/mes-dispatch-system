import axios from 'axios'
import {reatomCtx} from "../reatom-context";
import {accessTokenAtom, isAuthAtom} from "../auth/model.ts";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = reatomCtx.get(accessTokenAtom)

    if (!token) return config

    config.headers.Authorization = `Token ${token}`;

    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const currentRequest = error.config

        if (error.response?.status === 401 && !currentRequest._retry) {
            currentRequest._retry = true;

            try {
                const res = await api.post('/refresh')
                const newAccessToken = res.data.accessToken

                accessTokenAtom(reatomCtx, newAccessToken)

                currentRequest.headers.Authorization = `Token ${newAccessToken}`
                return api(currentRequest)

            } catch (refreshError) {
                isAuthAtom(reatomCtx, false)
                accessTokenAtom(reatomCtx, '')

                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
    }
)

