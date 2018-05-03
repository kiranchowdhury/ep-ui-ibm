import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'carbon-stepper-item',
  templateUrl: './stepper-item.component.html',
  styleUrls: ['./stepper-item.component.scss']
})
export class StepperItemComponent implements OnInit {
@Input() step: Step;

@Output() onSelect = new EventEmitter<StepperItemComponent>();

  constructor() { }

  ngOnInit() {
  }

  onItemClick() {
    this.onSelect.emit(this);
  }

  getLineColor(): string {
    // if(this.step.first)
    if (this.step.first) {
      return '';
    }
    return (!this.step.first && this.step.status) === 'complete' ? '#3d70b2' : '#8c9ba5'
  }

  getStepClass(): string {
    if (this.step.current) {
      return 'bx--progress-step--current';
    }
    if (this.step.status === 'complete') {
      return 'bx--progress-step--complete';
    }
    return 'bx--progress-step--incomplete';
  }


}
