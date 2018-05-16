import { Injectable } from '@angular/core';
import { AppState } from '../../@models/app-state';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthState } from '../auth/auth.state';
import { distinctUntilChanged } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoginState } from '../login/login.state';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<AuthState>({} as AuthState);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(private store: Store<AppState>) { }

  // load the user context from store

  loadUserContext() {
      this.store.select((state: AppState) => state.auth )
        .subscribe((authState: AuthState) => {
            this.currentUserSubject.next(authState);
        })
  }

  loadLoginContext() {
    this.store.select((state: AppState) => state.login)
      .subscribe((loginState: LoginState) => {
        this.isAuthenticatedSubject.next(loginState.authenticated);
      })
  }

  // must be called when log out
  public purgeCurrentContext() {
    this.purgeUserAuthContext();
    this.isAuthenticatedSubject.next(false);
  }

  /** Must be called when only group changed */
  public purgeUserAuthContext() {
    this.currentUserSubject.next({} as AuthState);
  }

}
