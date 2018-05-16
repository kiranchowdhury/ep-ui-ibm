import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { SessionStorageService } from '../session-storage/session-storage.service';

export function initStateFromLocalStorage(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}

export function initStateFromSessionStorage(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...SessionStorageService.loadInitialSessionState() };
    }
    return newState;
  };
}
