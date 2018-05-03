import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeContainerComponent } from './welcome/welcome-container/welcome-container.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'welcome',
    component: WelcomeContainerComponent,
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
