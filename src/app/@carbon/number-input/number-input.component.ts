import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'carbon-number-input',
    template: `
    <div class="bx--form-item">
      <label class="bx--label"><ng-content></ng-content></label>
      <div class="bx--number">
        <input type="number" [(ngModel)]="numValue" (change)="updateValue()" [min]="min"
           [max]="max" [defaultValue]="defaultValue" [step]="step">
        <div class="bx--number__controls">
          <svg name="up-icon-btn" class="up-icon" viewBox="0 -6 10 5" width="10" height="5"
            fill-rule="evenodd" (click)="updateValue(true)">
            <path d="M10 5L5 0 0 5z"></path>
          </svg>
          <svg name="down-icon-btn" class="down-icon" viewBox="0 6 10 5" width="10" height="5"
            fill-rule="evenodd" (click)="updateValue(false)">
            <path d="M10 0L5 5 0 0z"></path>
          </svg>
        </div>
      </div>
    </div>
    `
})
export class NumberInputComponent implements OnInit {
    @Input() max = 100;
    @Input() min = 0;
    @Input() defaultValue = 0;
    @Input() step = 1;
    numValue = 0;

    @Output()
    change: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
        this.numValue = this.defaultValue;
    }

    updateValue(up?: boolean) {
        if (up) {
            this.numValue = this.numValue + this.step;
        }
        if (!up) {
            this.numValue = this.numValue - this.step;
        }
        if (this.min > this.numValue) {
            this.numValue = this.min;
        } else if (this.max < this.numValue) {
            this.numValue = this.max;
        }
        this.change.emit(this.numValue);
    }

}
