import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeContainerComponent } from './welcome-container/welcome-container.component';
import { LeadspaceComponent } from './leadspace/leadspace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarbonComponentsModule } from '../../@carbon/carbon-components.module';
import { GroupListComponent } from './group-list/group-list.component';
import { SharedModule } from '../../@shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [WelcomeContainerComponent, LeadspaceComponent, GroupListComponent]
})
export class WelcomeModule { }
