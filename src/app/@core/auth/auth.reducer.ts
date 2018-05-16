import { Action } from '@ngrx/store';
import { LoadGroupsRequest, LoadGroupsResponse, SelectGroupRequest, SelectGroupResponse } from './auth.contract';
import { AuthState } from './auth.state';
import { AppState } from '../../@models/app-state';
import { ErrorResponse } from '../error/error-response';

export enum AuthActionTypes {
    LOAD_GROUPS = 'Load Groups',
    LOAD_GROUPS_SUCCESS = 'Load Group Success',
    LOAD_GROUPS_NO_AUTH = 'Load Group No Auth',
    LOAD_GROUPS_FAIL = 'Load Group Fail',
    SELECT_GROUP = 'Select Group',
    SELECT_GROUP_SUCCESS = 'Select Group Success',
    SELECT_GROUP_FAIL = 'Select Group Fail'
}

export class ActionLoadGroup implements Action {
    readonly type = AuthActionTypes.LOAD_GROUPS;
    constructor(public payload: LoadGroupsRequest) {}
}

export class ActionLoadGroupSuccess implements Action {
    readonly type = AuthActionTypes.LOAD_GROUPS_SUCCESS;
    constructor(public payload: LoadGroupsResponse) {}
}

export class ActionLoadGroupFail implements Action {
    readonly type = AuthActionTypes.LOAD_GROUPS_FAIL;
    constructor(public payload: ErrorResponse) {}
}

export class ActionSelectGroup implements Action {
    readonly type = AuthActionTypes.SELECT_GROUP;
    constructor(public payload: SelectGroupRequest) {}
}

export class ActionSelectGroupSuccess implements Action {
    readonly type = AuthActionTypes.SELECT_GROUP_SUCCESS;
    constructor(public payload: SelectGroupResponse) {}
}

export class ActionSelectGroupFail implements Action {
    readonly type = AuthActionTypes.SELECT_GROUP_FAIL;
    constructor(public payload: ErrorResponse) {}
}
export type AuthActions = ActionLoadGroup |
                         ActionLoadGroupSuccess |
                         ActionLoadGroupFail |
                         ActionSelectGroup |
                         ActionSelectGroupSuccess |
                         ActionSelectGroupFail

export const initialAuthState: AuthState = {
    authorized: false,
    groups: [],
    user: null,
    selectedGroupCode: '',
    loading: false,
    loadingMsg: '',
}

export const selectorAuth = (state: AppState) => state.auth || initialAuthState;

export function authReducer(
    state: AuthState = initialAuthState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOAD_GROUPS:
            return {
                ...state,
                loading: true,
                loadingMsg: 'Verifying your roles...'
            }
        case AuthActionTypes.LOAD_GROUPS_SUCCESS:
            const respItem = action.payload.items[0];
            return {
                ...state,
                loading: false,
                loadingMsg: '',
                authorized: false,
                groups: respItem.groups,
                user: {alias: respItem.alias, email: respItem.email},
                selectedGroupCode: respItem.selectedgroupcode
            }
        case AuthActionTypes.LOAD_GROUPS_FAIL:
            return {
                ...state,
                loading: false,
                loadingMsg: '',
                error: action.payload
            }
        case AuthActionTypes.SELECT_GROUP:
            return {
                ...state,
                loading: true,
                loadingMsg: 'Loading your workspace...'
            }
        case AuthActionTypes.SELECT_GROUP_SUCCESS:
            const resp = action.payload.items[0];
            return {
                ...state,
                selectedGroupCode: resp.selectedgroup,
                selectedgroupname: resp.selectedgroupname,
                authorized: true,
                authtolandtopricing: resp.authtolandtopricing,
                bpquotevisibility: resp.bpquotevisibility,
                auth_functions: resp.auth_functions,
                loading: false,
                loadingMsg: '',
            }
        case AuthActionTypes.SELECT_GROUP_FAIL:
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
