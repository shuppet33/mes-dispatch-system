import {api} from "./instance";
import type {LoginRequest, LoginResponse} from "../types/auth.ts";


export const login = (data: LoginRequest): Promise<LoginResponse> =>
    api.post('/login', data).then(res => res.data)

export const logout = () => api.post('/logout')