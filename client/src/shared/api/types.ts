import type {ROLE_PATTERN} from "./pattern.ts";

export type RoleId = keyof typeof ROLE_PATTERN; // 1 | 2 | 3
export type UserRole = typeof ROLE_PATTERN[RoleId];

export type User = {
    id_user: number;
    login: string;
    full_name: string;
    phone: string;
    role_id: RoleId;
    created_at: string;
};