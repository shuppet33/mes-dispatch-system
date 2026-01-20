import { api } from "./instance";
import type {LoginRequest, LoginResponse} from "../types/auth.types.ts";


export const login = (data: LoginRequest): Promise<LoginResponse> =>
    api.post('/login', data).then(res => res.data)