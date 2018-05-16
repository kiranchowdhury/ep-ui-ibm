import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginActionTypes, ActionSignIn, ActionSignInSuccess, ActionSignInFail } from './login.reducer';
import { switchMap, tap, map } from 'rxjs/operators';
import { LoginResponse } from './login.contract';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { JwtService } from '../api-handlers/jwt.service';
import { CustomHeaderService } from '../api-handlers/custom-header.service';
import { UserService } from '../context/user.service';

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions<Action>,
        private loginService: LoginService,
        private router: Router,
        private jwtService: JwtService,
        private customHeaderService: CustomHeaderService,
        private userContext: UserService,
    ) {}
    /* login effects */
    @Effect()
    login(): Observable<Action> {
        return this.actions$
            .ofType(LoginActionTypes.SIGN_IN)
            .pipe(
                tap((action: ActionSignIn) =>
                    this.customHeaderService.saveHeaderParam('ENV', action.payload.env)),
                switchMap((action: ActionSignIn) =>
                this.loginService.login(action.payload)
                .pipe(
                    tap((result: LoginResponse) =>
                    this.jwtService.saveToken(result.token)),
                    map((result: LoginResponse) => (result.token ?
                        new ActionSignInSuccess(result) :
                        new ActionSignInFail({code: 'EF0001', message: 'Invalid email or password'})))
                )
            )
            )
    }

    @Effect({dispatch: false})
    loginSuccess(): Observable<Action> {
        return this.actions$
            .ofType(LoginActionTypes.SIGN_IN_SUCCESS)
            .pipe(
                tap((action) => this.userContext.loadLoginContext()),
                tap((action) => this.router.navigate(['/pages/welcome']))
            )
    }
}
