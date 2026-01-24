import type {Role} from "../../shared/types/auth.ts";

export type UserFormData = {
    role: Role | '';
    login: string;
    password: string;
    confirmPassword: string;
    full_name: string;
}

export type UserSubmitData = {
    role: number;
    login: string;
    password: string;
    full_name: string;
}

export type UserFormProps = {
    onCancel: () => void;
    onSubmit: (data: UserSubmitData) => void;
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