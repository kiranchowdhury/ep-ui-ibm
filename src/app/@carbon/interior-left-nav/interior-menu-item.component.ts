import { Component, Input, OnInit, ContentChildren, QueryList, AfterContentInit, HostListener } from '@angular/core';

import { InteriorMenuService } from './interior-menu.service';

let uniqueId = 0;

@Component({
    selector: 'carbon-interior-nav-item',
    template: `
    <li id="{{_id}}" role="menuitem" tabindex="0" class="left-nav-list__item"
      [ngClass]="{'left-nav-list__item--active' : active,
      'left-nav-list__item--has-children': hasSubMenu,
      'left-nav-list__item--expanded': subMenuVisible}">
        <a class="left-nav-list__item-link" (click)="toggleSubMenu()">{{label}}
            <div *ngIf="hasSubMenu" class="left-nav-list__item-icon">
                <svg class="bx--interior-left-nav__icon" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
                <path d="M10 0L5 5 0 0z"></path>
                </svg>
            </div>
        </a>
        <ul *ngIf="hasSubMenu" role="menu" aria-hidden="true" class="left-nav-list left-nav-list--nested">
            <ng-content select="carbon-interior-nav-item"></ng-content>
        </ul>
    </li>`
})
export class InteriorMenuItemComponent implements OnInit, AfterContentInit {
    @Input() label: string;
    @ContentChildren(InteriorMenuItemComponent) subMenuItems: QueryList<InteriorMenuItemComponent>;

    _id = 'interior-menu-item-' + uniqueId++;
    hasSubMenu = false;
    subMenuVisible = false;
    active = false;

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if ((<any>event.target).attributes.id !== this._id) {
            // Prevents clicks on children propagating as a click on component
            event.stopPropagation();
        }
    }

    constructor(private menuService: InteriorMenuService) { }

    ngOnInit() {
        this.menuService.registerMenuItem(this);
    }

    ngAfterContentInit() {
        this.hasSubMenu = this.subMenuItems.length > 1;
    }

    toggleSubMenu() {
        if (this.hasSubMenu) {
            this.subMenuVisible = !this.subMenuVisible;
        }
        this.menuService.setActive(this._id);
        return false;
    }
}
