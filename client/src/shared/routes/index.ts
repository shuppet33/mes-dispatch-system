import type {Role} from "../types/auth.ts";


export const ROLE_ROUTES: Record<Role, string> = {
    admin: '/admin',
    dispatch: '/dispatch',
    service: '/service',
};