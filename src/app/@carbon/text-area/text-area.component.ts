import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Allow a unique ID for each component instance
let uniqueId = 0;

@Component({
    selector: 'carbon-text-area',
    template: `
    <div class="bx--form-item">
      <label for="text-area{{_id}}" class="bx--label" [ngClass]="{'bx--label--disabled': disabled}">{{ label }}</label>
      <textarea id="text-area{{_id}}" type="text" class="bx--text-area" rows="4" cols="50" [value]="value" [placeholder]="placeholder"
        attr.name="{{name}}" (change)="textChanged($event.target.value)" [disabled]="disabled"></textarea>
    </div>
    `
})
export class TextAreaComponent implements OnInit {

    @Input() label = '';
    @Input() disabled = false;
    @Input() name = '';
    @Input() value = '';
    @Input() placeholder = '';

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
