import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { DropdownOptionComponent } from './dropdown-option.component';

@Component({
    selector: 'carbon-dropdown',
    template: `
    <ul class="bx--dropdown" [ngStyle]="getDropdownStyle()" tabindex="0" [ngClass]="{'bx--dropdown--open':menuVisible}">
        <li class="bx--dropdown-text" (click)="toggleMenu()" (clickOutside)="toggleMenu(false)">{{selectedText}}</li>
        <carbon-icon class="bx--dropdown__arrow" name="caret--down" [ngStyle]="getCarretStyle()"></carbon-icon>
        <li><ul class="bx--dropdown-list" [ngStyle]="getDropDownListStyle()"><ng-content></ng-content></ul></li>
    </ul>`,
    styleUrls: ['./dropdown.component.scss'],

})
export class DropdownComponent implements AfterContentInit {
    @Input() styleOption: string;
    @Input() name: string;
    @Input() default: string;
    @Output() optionSelected: EventEmitter<string> = new EventEmitter();
    @ContentChildren(DropdownOptionComponent) options: QueryList<DropdownOptionComponent>;

    menuVisible = false;
    selectedText: string = undefined;
    value: string = undefined;

    constructor() {}

    getCarretStyle() {
        if (this.styleOption === 'light') {
            return {fill: 'white'};
        }
    }

    getDropdownStyle() {
        if (this.styleOption === 'light') {
            return {
                backgroundColor: '#152935',
                border: '.5px solid white',
                color: 'white'
            }
        }
    }

    getDropDownListStyle() {
        if (this.styleOption === 'light') {
            return {backgroundColor: '#152935'}
        }
    }

    ngAfterContentInit() {
        this.selectedText = this.default;
        this.value = '';

        this.options.forEach(option => {
            if (option.value === this.default || option.selected === true) {
                this.selectOption(option);
                this.selectedText = option.text;
                this.value = option.value;
            }

            option.onSelect.subscribe(dropdownOption => {
                this.selectOption(dropdownOption);
                this.value = dropdownOption.value;
                this.selectedText = dropdownOption.text;
                this.optionSelected.emit(dropdownOption.value);
                this.toggleMenu(false);
            });
        });
    }

    private selectOption(dropdownOption: DropdownOptionComponent) {
        this.options.forEach(option => option.selected = option === dropdownOption);
    }

    toggleMenu(newValue?) {
        if (newValue !== undefined) {
            this.menuVisible = newValue;
        } else {
            this.menuVisible = !this.menuVisible;
        }
    }
}
