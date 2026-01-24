export type UserType = {
    id: number;
    role: number;
    username: string;
};

export type LoginResponse = {
    accessToken: string;
    user: UserType;
};

export type LoginRequest = {
    login: string;
    password: string;
};

export type Role = 'admin' | 'dispatcher' | 'service'