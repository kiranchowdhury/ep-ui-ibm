import { Component, Input } from '@angular/core';

@Component({
    selector: 'carbon-button',
    template: `<button class="bx--btn" [disabled]="disabled" [ngClass]="{
        'bx--btn--primary':type==='primary',
        'bx--btn--secondary':type==='secondary',
        'bx--btn--danger':type==='danger',
        'bx--btn--sm':size==='small'}">
    <ng-content></ng-content></button>`,
})
export class ButtonComponent {
    @Input() type: string;
    @Input() disabled = false;
    @Input() size: string;
}
