import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './click-outside.directive';
import { OverflowMenuComponent, OverflowMenuItemComponent } from './overflow-menu';
import { IconComponent } from './icon/icon.component';
import { AccordionComponent, AccordionItemComponent } from './accordion';
import { ButtonComponent } from './button/button.component';
import { CardComponent, CardOverviewComponent, CardFooterComponent } from './card';
import { DropdownOptionComponent, DropdownComponent } from './dropdown';
import { TagComponent } from './tag/tag.component';
import { SnippetComponent } from './snippet/snippet.component';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { ModalComponent, ModalService } from './modal';
import { TextAreaComponent } from './text-area/text-area.component';
import { TextInputComponent } from './text-input/text-input.component';
import { ToggleComponent } from './toggle/toggle.component';
import { InteriorMenuItemComponent, InteriorNavComponent, InteriorMenuService } from './interior-left-nav';
import { StepperComponent } from './stepper/stepper.component';
import { StepperItemComponent } from './stepper/stepper-item/stepper-item.component';
import { RouterModule } from '@angular/router';
import { StepperCircleComponent } from './stepper/stepper-circle/stepper-circle.component';

const externalModules = [
    AccordionComponent,
    AccordionItemComponent,
    ButtonComponent,
    CardComponent,
    CardOverviewComponent,
    CardFooterComponent,
    SnippetComponent,
    DropdownOptionComponent,
    DropdownComponent,
    IconComponent,
    ModalComponent,
    OverflowMenuComponent,
    OverflowMenuItemComponent,
    TagComponent,
    LoadingComponent,
    NotificationComponent,
    NumberInputComponent,
    ToggleComponent,
    TextAreaComponent,
    TextInputComponent,
    InteriorMenuItemComponent,
    InteriorNavComponent,
    StepperComponent,
    StepperItemComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        ClickOutsideDirective,
        ...externalModules,
        StepperCircleComponent,
    ],
    exports: [
        ...externalModules
    ],
    providers: [ModalService, InteriorMenuService]
})
export class CarbonComponentsModule { }
export { ModalService } from './modal';
export { InteriorMenuService } from './interior-left-nav';
