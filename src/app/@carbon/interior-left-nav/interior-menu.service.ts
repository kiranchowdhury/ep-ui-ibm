import { Injectable } from '@angular/core';

import { InteriorMenuItemComponent } from './interior-menu-item.component'

@Injectable()
export class InteriorMenuService {
    private menuItems: Array<InteriorMenuItemComponent>;

    constructor() {
        this.menuItems = [];
    }

    registerMenuItem(newMenuItem: InteriorMenuItemComponent): void {
        this.menuItems.push(newMenuItem);
    }

    setActive(menuItemId) {
        for (const menuItem of this.menuItems) {
            if (menuItem._id === menuItemId) {
                menuItem.active = true;
            } else {
                menuItem.active = false;
            }
        }
    }

    getMenuItems() {
        return this.menuItems;
    }
}
