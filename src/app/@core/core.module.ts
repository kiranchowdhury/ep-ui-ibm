import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs/observable/of';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './api-handlers/http.token.interceptor';
import { ApiConnectorService } from './api-handlers/api-connector.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { JwtService } from './api-handlers/jwt.service';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,

  AnalyticsService,
];

const EP_HTTP_HANDLER = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ApiConnectorService,
  LocalStorageService,
  JwtService,
]

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  declarations: [],
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
        EP_HTTP_HANDLER,
      ],
    };
  }
}
