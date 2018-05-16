export interface LoginRequest {
    env?: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
