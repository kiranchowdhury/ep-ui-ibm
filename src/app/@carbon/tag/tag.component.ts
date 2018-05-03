import { Component, Input } from '@angular/core';

@Component({
    selector: 'carbon-tag',
    template: `<span class="bx--tag" [ngClass]="'bx--tag--'+type"><ng-content></ng-content></span>`
})
export class TagComponent {
    @Input() type: string;
}
