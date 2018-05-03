import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'carbon-overflow-menu',
    template: `
    <div (click)="toggleMenu()" (clickOutside)="toggleMenu(false)" tabindex="0" aria-label="Overflow menu" class="bx--overflow-menu">
        <carbon-icon class="bx--overflow-menu__icon" name="overflow-menu"></carbon-icon>
        <ul class="bx--overflow-menu-options"
            [ngClass]="{'bx--overflow-menu-options--open':menuVisible, 'bx--overflow-menu--flip': textAlign == 'left'}">
            <ng-content></ng-content>
        </ul>
    </div>`
})
export class OverflowMenuComponent {
    @HostBinding('style.display') display = 'inline-block';

    @Input('text-align')
    textAlign = 'right';

    menuVisible = false;

    toggleMenu(newValue?) {
        if (newValue !== undefined) {
            this.menuVisible = newValue;
        } else {
            this.menuVisible = !this.menuVisible;
        }
    }
}
