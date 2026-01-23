import type {Role} from "../../shared/types/auth.ts";
import {PRIORITY_PATTERN, type STATUS_PATTERN} from '../../shared/api/pattern.ts'

export type UserFormData = {
    role: Role | '';
    login: string;
    password: string;
    confirmPassword: string;
    full_name: string;
}

export type UserFormProps = {
    onCancel: () => void;
}

export type UserSubmitData = {
    role: number;
    login: string;
    password: string;
    full_name: string;
}

export interface UserFormValues extends UserSubmitData {
    confirmPassword: string;
}

export type RoleFilter = 'all' | 'admin' | 'dispatcher' | 'service';

export type User = {
    id_user: number,
    login: string,
    full_name: string,
    phone: string,
    role_id: 1 | 2 | 3,
    created_at: string
}

export type UserTableProps = {
    users: User[];
    onRoleFilterChange: (role: RoleFilter) => void;
    filterRole: RoleFilter;
    onShowInfo: (user: User) => void;
    onDelete: (userId: string) => void;
}

export type Request = {
    id_request: number;
    dispatcher_id: number;
    service_id: number;
    caller_full_name: string;
    caller_phone: string;
    settlement: string;
    address: string;
    status_id: keyof typeof STATUS_PATTERN;
    priority_id: keyof typeof PRIORITY_PATTERN;
    description: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
};

export type Service = {
    id: number;
    name: string;
    description: string;
};