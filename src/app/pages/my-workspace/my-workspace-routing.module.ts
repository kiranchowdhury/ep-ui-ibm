import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceContainerComponent } from './workspace-container/workspace-container.component';
import { WorkspaceBodyComponent } from './workspace-body/workspace-body.component';
import { WsMainComponent } from './ws-main/ws-main.component';

const routes: Routes = [{
  path: '',
  component: WorkspaceContainerComponent,
  children: [{
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  }, {
    path: 'main',
    component: WsMainComponent, // WorkspaceBodyComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorkspaceRoutingModule { }
