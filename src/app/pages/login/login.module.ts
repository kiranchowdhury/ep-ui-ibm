import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarbonComponentsModule } from '../../@carbon/carbon-components.module';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@shared/shared.module';
// import { LoadingComponent } from '../../@carbon/loading/loading.component';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule
  ],
  declarations: [LoginFormComponent]
})
export class LoginModule { }
