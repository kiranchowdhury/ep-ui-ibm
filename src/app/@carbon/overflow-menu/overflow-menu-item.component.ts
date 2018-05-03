import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'carbon-overflow-menu-item',
    template: `<li><button class="bx--overflow-menu-options__btn"><ng-content></ng-content></button></li>`
})
export class OverflowMenuItemComponent implements OnInit {
    @HostBinding('class') className = 'bx--overflow-menu-options__option';
    @Input() type = '';

    ngOnInit () {
        if (this.type === 'danger') {
            this.className += ' bx--overflow-menu-options__option--danger'
        }
    }
}
