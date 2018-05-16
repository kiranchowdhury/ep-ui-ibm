import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWorkspaceRoutingModule } from './my-workspace-routing.module';
import { SharedModule } from '../../@shared/shared.module';
import { WorkspaceContainerComponent } from './workspace-container/workspace-container.component';
import { WorkspaceHeaderComponent } from './workspace-header/workspace-header.component';
import { WorkspaceBodyComponent } from './workspace-body/workspace-body.component';
import { ThemeModule } from '../../@theme/theme.module';
import { AgGridModule } from 'ag-grid-angular';
import { WsMainComponent } from './ws-main/ws-main.component';
import { SavedCriteriaComponent } from './saved-criteria/saved-criteria.component';
import { ManageCriteriaService } from './saved-criteria/manage-criteria.service';
import { StoreModule } from '@ngrx/store';
import { criteriaReducer } from './saved-criteria/saved-criteria.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManageCriteriaEffects } from './saved-criteria/saved-criteria.effects';
@NgModule({
  imports: [
    ThemeModule,
    SharedModule,
    MyWorkspaceRoutingModule,
    AgGridModule.withComponents([]),
    StoreModule.forFeature('workspace', {
      savedCriteriaState: criteriaReducer
    }),
    EffectsModule.forFeature([ManageCriteriaEffects]),
  ],
  declarations: [
    WorkspaceContainerComponent,
    WorkspaceHeaderComponent,
    WorkspaceBodyComponent,
    WsMainComponent,
    SavedCriteriaComponent
  ],
    providers: [
      ManageCriteriaService
    ]
})
export class MyWorkspaceModule { }
