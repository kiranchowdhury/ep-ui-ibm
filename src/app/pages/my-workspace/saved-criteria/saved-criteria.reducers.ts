import { Action } from '@ngrx/store';
import { LoadCriteriaRequest, LoadCriteriaResponse } from './saved-criteria.contracts';
import { ErrorResponse } from '../../../@core/error/error-response';
import { WorkspaceState } from '../workspace-state';
import { SearchCriteriaSate, SearchCriteria } from './search-criteria.state';
import { AppState } from '../../../@models/app-state';

export enum ManageCriteriaActionTypes {
    LOAD_SAVED_CRITERIA = '[Workspace] Load Saved Criteria',
    LOAD_SAVED_CRITERIA_SUCCESS = '[Workspace] Load Saved Criteria Success',
    LOAD_SAVED_CRITERIA_FAIL = '[Workspace] Load Saved Criteria FAIL',
}

export class LoadSavedCriteria implements Action {
    readonly type = ManageCriteriaActionTypes.LOAD_SAVED_CRITERIA;
    constructor(public payload: LoadCriteriaRequest) {}
}

export class LoadSavedCriteriaSuccess implements Action {
    readonly type = ManageCriteriaActionTypes.LOAD_SAVED_CRITERIA_SUCCESS;
    constructor(public payload: LoadCriteriaResponse) {}
}

export class LoadSavedCriteriaFail implements Action {
    readonly type = ManageCriteriaActionTypes.LOAD_SAVED_CRITERIA_FAIL;
    constructor(public payload: ErrorResponse) {}
}

export type ManageCriteriaActions = LoadSavedCriteria |
                                    LoadSavedCriteriaSuccess |
                                    LoadSavedCriteriaFail

export const initalCriteriaState: SearchCriteriaSate = {
    savedCriteria: [],
    default: {code: 'MQ', name: 'My Quotes'},
    lastSelected: {code: 'MQ', name: 'My Quotes'},
}

export const selectorCriteriaState
    = (state: AppState) => state.workspace.savedCriteriaState || initalCriteriaState;

export function criteriaReducer (
    state: SearchCriteriaSate = initalCriteriaState,
    action: ManageCriteriaActions
): SearchCriteriaSate {
    switch (action.type) {
        case ManageCriteriaActionTypes.LOAD_SAVED_CRITERIA:
            return {
                ...state,
                loading: true,
            }
        case ManageCriteriaActionTypes.LOAD_SAVED_CRITERIA_SUCCESS:
            return {
                ...state,
                savedCriteria: action.payload.savedCriterias,
                default: CriteriaUtils.getDefaultCriteria(action.payload.savedCriterias),
                lastSelected: CriteriaUtils.getLastSelectedCriteria(action.payload.savedCriterias),
                loading: false,
            }
        case ManageCriteriaActionTypes.LOAD_SAVED_CRITERIA_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}

export  class CriteriaUtils {
    static getDefaultCriteria(savedCriterias: SearchCriteria[]): SearchCriteria {
        let defaultCriteria: SearchCriteria = null;
        savedCriterias.forEach(criteria => {
            if (criteria.default) { defaultCriteria = criteria}
        })
       return defaultCriteria;
    }

    static getLastSelectedCriteria(savedCriterias: SearchCriteria[]) {
        let lastSelected: SearchCriteria = null;
        savedCriterias.forEach(criteria => {
            if (criteria.lastSelected) {
                lastSelected = criteria;
            }
        })
        return lastSelected;
    }
}


