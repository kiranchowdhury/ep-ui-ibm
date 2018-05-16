import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeContainerComponent } from './welcome/welcome-container/welcome-container.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'login',
    component: LoginFormComponent
  }, {
    path: 'welcome',
    component: WelcomeContainerComponent,
  }, {
    path: 'workspace',
    loadChildren: './my-workspace/my-workspace.module#MyWorkspaceModule',
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
