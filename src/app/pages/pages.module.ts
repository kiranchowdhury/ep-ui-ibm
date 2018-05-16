import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { WelcomeModule } from './welcome/welcome.module';
import { LoginModule } from './login/login.module';
import { CarbonComponentsModule } from '../@carbon/carbon-components.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    LoginModule,
    DashboardModule,
    WelcomeModule,
    CarbonComponentsModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
