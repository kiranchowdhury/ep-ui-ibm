import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthActionTypes,
    ActionLoadGroup,
    ActionLoadGroupSuccess,
    ActionLoadGroupFail,
    ActionSelectGroup,
    ActionSelectGroupSuccess,
    ActionSelectGroupFail} from './auth.reducer';
import { switchMap, tap, map } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LoadGroupsResponse, SelectGroupResponse } from './auth.contract';
import { CustomHeaderService } from '../api-handlers/custom-header.service';
import { UserService } from '../context/user.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions<Action>,
        private localStorage: LocalStorageService,
        private customeHeaderService: CustomHeaderService,
        private authService: AuthService,
        private router: Router,
        private userContext: UserService) {}

    @Effect()
    loadGroup(): Observable<Action> {
        return this.actions$
            .ofType(AuthActionTypes.LOAD_GROUPS)
            .pipe(
                switchMap((action: ActionLoadGroup) =>
                this.authService.loadGroups(action.payload)
                .pipe(
                    tap((resp: LoadGroupsResponse) => this.saveDefaultContextParam(resp)),

                    map((resp: LoadGroupsResponse) => (
                        resp.status === '0' ?
                        new ActionLoadGroupFail({code: resp.message, message: resp.message})
                        : (resp.items[0].groups.length) > 1 ? new ActionLoadGroupSuccess(resp)
                        : new ActionSelectGroup({
                            apiid: 'getAuthGroup',
                            methodname: 'getSelectedIBMGroupInfo',
                            selectedgroup: resp.items[0].selectedgroupcode
                        })
                    ))
                ))
            )
    }

    @Effect()
    selectGroup(): Observable<Action> {
        return this.actions$
        .ofType(AuthActionTypes.SELECT_GROUP)
        .pipe(
            switchMap((action: ActionSelectGroup) =>
                this.authService.selectGroup(action.payload)
                .pipe(
                    tap((resp: SelectGroupResponse) =>
                    this.localStorage.setItem('SELECTEDGROUP', resp.items[0].selectedgroup)),
                    map((resp: SelectGroupResponse) => (
                        resp.status === '1' ?
                        new ActionSelectGroupSuccess(resp) :
                        new ActionSelectGroupFail({code: resp.message, message: resp.message})
                    ))
                ))
        )
    }

    @Effect({dispatch: false})
    selectGroupSuccess(): Observable<Action> {
        return this.actions$
        .ofType(AuthActionTypes.SELECT_GROUP_SUCCESS)
        .pipe(
            tap((action) => this.userContext.loadUserContext()),
            tap((action) => this.router.navigate(['/pages/workspace']))
        )
    }

    /*  function to set default selected group and email in local storage*/
    private saveDefaultContextParam(data: LoadGroupsResponse) {
        const group: string = (this.customeHeaderService.getHeaderParam('SELECTEDGROUP')) ?
            this.customeHeaderService.getHeaderParam('SELECTEDGROUP') :
            data.items[0].selectedgroupcode
        this.customeHeaderService.saveHeaderParam('SELECTEDGROUP', group);
        this.customeHeaderService.saveHeaderParam('CONTEXTID', data.items[0].email);
    }


}
