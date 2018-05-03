import { Component } from '@angular/core';

@Component({
    selector: 'carbon-card',
    template: '<article class="bx--card" tabindex="0" aria-labelledby="card-title-2"><ng-content></ng-content></article>'
})
export class CardComponent {
}
