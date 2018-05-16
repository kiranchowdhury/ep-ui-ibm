import { ErrorResponse } from '../error/error-response';
import { AuthFunction } from './auth.contract';

export interface AuthState {
    authorized: boolean;
    user: User;
    groups: Group[],
    selectedGroupCode: string;
    error?: ErrorResponse;
    loading?: boolean;
    loadingMsg?: string;
    selectedgroupname?: string;
    authtolandtopricing?: string;
    bpquotevisibility?: string;
    auth_functions?: AuthFunction[]
}

export interface User {
    email: string;
    alias: string;
}

export interface Group {
    id: string;
    name: string;
}
