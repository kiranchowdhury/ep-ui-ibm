import { Action } from '@ngrx/store';
import { LoginRequest, LoginResponse } from './login.contract';
import { ErrorResponse } from '../error/error-response';
import { LoginState } from './login.state';
import { AppState } from '../../@models/app-state';
export enum LoginActionTypes {
    SIGN_IN = 'Sign In',
    SIGN_IN_SUCCESS = 'Sign In Success',
    SIGN_IN_FAIL = 'Sign In Fail'
}

export class ActionSignIn implements Action {
    readonly type = LoginActionTypes.SIGN_IN;
    constructor(public payload: LoginRequest) {}
}

export class ActionSignInSuccess implements Action {
    readonly type = LoginActionTypes.SIGN_IN_SUCCESS;
    constructor(public payload: LoginResponse) {}
}

export class ActionSignInFail implements Action {
    readonly type = LoginActionTypes.SIGN_IN_FAIL;
    constructor(public payload: ErrorResponse) {}
}

export type LoginActions = ActionSignIn |
                           ActionSignInSuccess |
                           ActionSignInFail

export const initialLoginState: LoginState = {
    authenticated: false,
}

export const selectorLogin = (state: AppState) => state.login || initialLoginState;

export function loginReducer(
    state: LoginState = initialLoginState,
    action: LoginActions
): LoginState {
    switch (action.type) {
        case LoginActionTypes.SIGN_IN:
            return {
                ...state,
                loading: true,
                loadingMsg: 'Signing in....',
            }
        case LoginActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                loading: false,
                loadingMsg: ''
            }
        case LoginActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
                loadingMsg: ''
            }
        default:
            return state;
    }
}
