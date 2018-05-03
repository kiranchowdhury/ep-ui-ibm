import { Component, Input } from '@angular/core';

@Component({
    selector: 'carbon-accordion-item',
    template: `
<li tabindex="{{tabindex}}" class="bx--accordion__item" [ngClass]="{'bx--accordion__item--active': isExpanded}">
  <div class="bx--accordion__heading" (click)="toggle()">
    <carbon-icon class="bx--accordion__arrow" name="chevron--right"></carbon-icon>
    <p class="bx--accordion__title">{{label}}</p>
  </div>
  <div class="bx--accordion__content"><ng-content></ng-content></div>
</li>`
})
export class AccordionItemComponent {
    @Input() tabindex = 0;
    @Input() label: string;

    isExpanded = false;

    toggle(newValue?) {
        if (newValue !== undefined) {
            this.isExpanded = newValue;
        } else {
            this.isExpanded = !this.isExpanded;
        }
    }
}
