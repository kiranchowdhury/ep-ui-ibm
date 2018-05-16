import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Allow a unique ID for each component instance
let uniqueId = 0;

@Component({
    selector: 'carbon-text-input',
    template: `
    <div class="bx--form-item">
      <label for="text-input{{_id}}" class="bx--label" [ngClass]="{'bx--label--disabled': disabled}">{{ label }}</label>
      <input id="text-input{{_id}}" [type]="type" class="bx--text-input" [value]="value" [placeholder]="placeholder"
        [formControlName]="formControlName"
        attr.name="{{name}}" (change)="textChanged($event.target.value)" [disabled]="disabled"/>
    </div>
    `
})
export class TextInputComponent implements OnInit {

    @Input() label = '';
    @Input() disabled = false;
    @Input() name = '';
    @Input() value = '';
    @Input() placeholder = '';
    @Input() type = ''
    @Input() formControlName = '';

    @Output()
    onChange: EventEmitter<string> = new EventEmitter<string>();

    _id = uniqueId++;

    constructor() { }

    ngOnInit() {
    }

    textChanged(newValue: string) {
        this.value = newValue;
        this.onChange.emit(newValue);
    }
}
