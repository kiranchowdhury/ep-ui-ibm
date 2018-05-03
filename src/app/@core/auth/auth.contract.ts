export interface AuthRequest {
    apiid: string;
    methodname: string;
}

export interface AuthResponse {
    email: string;
    alias: string;
}
