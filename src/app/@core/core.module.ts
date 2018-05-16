import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs/observable/of';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { HttpClientModule } from '@angular/common/http';
// import { HttpTokenInterceptor } from './api-handlers/http.token.interceptor';
import { ApiConnectorService } from './api-handlers/api-connector.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { JwtService } from './api-handlers/jwt.service';
import { SessionStorageService } from './session-storage/session-storage.service';
import { LoginService } from './login/login.service';
import { ShowErrorComponent } from './error/components/show-error/show-error.component';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { loginReducer } from './login/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { initStateFromLocalStorage,
  initStateFromSessionStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { LoginEffects } from './login/login.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { AuthService } from './auth/auth.service';
import { CustomHeaderService } from './api-handlers/custom-header.service';
import { UserService } from './context/user.service';




const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,

  AnalyticsService,
];

const EP_CORE_PROVIDERS = [
  ApiConnectorService,
  LocalStorageService,
  SessionStorageService,
  JwtService,
  LoginService,
  AuthService,
  CustomHeaderService,
  UserService
]

const EP_CORE_COMPONENTS = [
]

const EXPORTED_EP_CORE_COMPONENTS = [
]

export const metaReducers: MetaReducer<any>[] = [
  initStateFromLocalStorage,
  initStateFromSessionStorage];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // ngrx
    StoreModule.forRoot({
      login: loginReducer,
      auth: authReducer,
    }, {
      metaReducers
    }),
    EffectsModule.forRoot([
      LoginEffects,
      AuthEffects,
    ]),
    StoreDevtoolsModule.instrument()
  ],
  exports: [
    EXPORTED_EP_CORE_COMPONENTS,
  ],
  declarations: [
    EP_CORE_COMPONENTS,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        EP_CORE_PROVIDERS,
      ],
    };
  }
}
