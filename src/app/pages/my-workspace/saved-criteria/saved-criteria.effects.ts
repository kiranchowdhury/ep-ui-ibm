import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../@core/local-storage/local-storage.service';
import { ManageCriteriaService } from './manage-criteria.service';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ManageCriteriaActionTypes, LoadSavedCriteria, LoadSavedCriteriaSuccess } from './saved-criteria.reducers';
import { tap, switchMap, map } from 'rxjs/operators';
import { LoadCriteriaResponse } from './saved-criteria.contracts';

@Injectable()
export class ManageCriteriaEffects {
    constructor(
        private action$: Actions<Action>,
        private localStorage: LocalStorageService,
        private criteriaService: ManageCriteriaService) {}

    @Effect()
    loadCriteria(): Observable<Action> {
        return this.action$
            .ofType(ManageCriteriaActionTypes.LOAD_SAVED_CRITERIA)
            .pipe(
               switchMap(((action: LoadSavedCriteria) =>
                this.criteriaService
                    .getSavedCriteria(action.payload)
                    .pipe(
                        tap((data: LoadCriteriaResponse) =>
                            this.localStorage.setItem('SAVEDCRITERIA', data.savedCriterias)),
                        map((data: LoadCriteriaResponse) => new LoadSavedCriteriaSuccess(data))
                    )))
            )
    }
}
