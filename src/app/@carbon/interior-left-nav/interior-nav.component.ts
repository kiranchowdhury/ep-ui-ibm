import { Component } from '@angular/core';

@Component({
    selector: 'carbon-interior-nav',
    template: `
    <nav role="navigation" style="position:relative" aria-label="Interior Left Navigation"
    class="bx--interior-left-nav bx--interior-left-nav--collapseable" [ngClass]="{'bx--interior-left-nav--collapsed':collapsed}">
        <ul role="menubar" class="left-nav-list" [attr.aria-hidden]="collapsed">
            <ng-content></ng-content>
        </ul>
        <div class="bx--interior-left-nav-collapse">
            <a class="bx--interior-left-nav-collapse__link" (click)="collapsed = !collapsed">
            <svg class="bx--interior-left-nav-collapse__arrow" width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">
                <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z"></path>
            </svg>
            </a>
        </div>
    </nav>`
})
export class InteriorNavComponent {
    collapsed = false;
}
