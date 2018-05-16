import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarbonComponentsModule } from '../@carbon/carbon-components.module';

@NgModule({
  imports: [
  ],
  declarations: [BusyIndicatorComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarbonComponentsModule,
    BusyIndicatorComponent]
})
export class SharedModule { }
