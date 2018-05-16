import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { Store } from '@ngrx/store';
import { AppState } from '../@models/app-state';
import { selectorLogin } from '../@core/login/login.reducer';
import { LoginState } from '../@core/login/login.state';
import { selectorAuth } from '../@core/auth/auth.reducer';
import { AuthState } from '../@core/auth/auth.state';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout [authenticated]="authenticated" [authorized]="authorized" [menu]="menu">
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  authorized = false;
  authenticated = false;
  /*
  * Get the authorized flag from Store
  * */
  menu = MENU_ITEMS;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectorLogin)
    .subscribe((loginState: LoginState) => {
      console.log('Login State ', loginState);
      this.authenticated = loginState.authenticated;
    })

    this.store.select(selectorAuth)
    .subscribe((authState: AuthState) => {
      console.log('Auth State', authState);
      this.authorized = authState.authorized;
    })
  }
}
