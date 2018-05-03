import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeContainerComponent } from './welcome-container/welcome-container.component';
import { LeadspaceComponent } from './leadspace/leadspace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarbonComponentsModule } from '../../@carbon/carbon-components.module';
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarbonComponentsModule,
  ],
  declarations: [WelcomeContainerComponent, LeadspaceComponent, GroupListComponent]
})
export class WelcomeModule { }
