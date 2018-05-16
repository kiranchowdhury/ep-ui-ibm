import { ErrorResponse } from '../error/error-response';
export interface LoginState {
    authenticated: boolean;
    loading?: boolean;
    loadingMsg?: string;
    error?: ErrorResponse;
}
