import { Component, Input, Output, EventEmitter } from '@angular/core';

// Allow a unique ID for each component instance
let uniqueId = 0;

@Component({
    selector: 'carbon-toggle',
    template: `<fieldset class="bx--fieldset">
  <legend *ngIf="label" class="bx--label">{{label}}</legend>
  <div class="bx--form-item">
    <input class="bx--toggle" id="toggle{{_id}}" [disabled]="disabled"
        type="checkbox" [checked]="value" (change)="toggleChanged($event.target.checked)">
    <label class="bx--toggle__label" for="toggle{{_id}}">
        <span class="bx--toggle__text--left">{{offLabel}}</span>
        <span class="bx--toggle__appearance"></span>
        <span class="bx--toggle__text--right">{{onLabel}}</span>
    </label>
  </div>
</fieldset>`
})
export class ToggleComponent {
    @Input() value = false;
    @Input() label: string;
    @Input() offLabel = 'Off';
    @Input() onLabel = 'On';
    @Input() disabled = false;

    @Output() onChange = new EventEmitter<boolean>();

    _id = uniqueId++;

    toggleChanged(newValue: boolean) {
        this.value = newValue;
        this.onChange.emit(newValue);
    }
}
