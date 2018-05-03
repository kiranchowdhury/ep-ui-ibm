import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'carbon-dropdown-option',
    template: `
    <li class="bx--dropdown-item" [ngClass]="{'bx--dropdown--selected':selected}" (click)="onClick()">
        <a class="bx--dropdown-link" #content><ng-content></ng-content></a>
    </li>`,
    styleUrls: ['dropdown.component.scss'],
})
export class DropdownOptionComponent {
    @Input() value: string;
    @Input() selected = false;
    @Output() onSelect = new EventEmitter<DropdownOptionComponent>();
    @ViewChild('content') content: ElementRef;

    constructor() { }

    onClick() {
        this.onSelect.emit(this);
    }

    get text () {
        return this.content.nativeElement.innerHTML;
    }

}
