import { Component, OnInit, ContentChildren, QueryList,
  AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { StepperItemComponent } from './stepper-item/stepper-item.component';
import { Step } from './step';
import { Router } from '@angular/router';

@Component({
  selector: 'carbon-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements AfterContentInit {

  steps: Step[];

  @ContentChildren(StepperItemComponent) stepItems: QueryList<StepperItemComponent>

  constructor(router: Router) { }

  ngAfterContentInit() {
    this.stepItems.forEach(item => {
      // this.steps.push(item.step);
      item.onSelect.subscribe((data: StepperItemComponent) => {
        // tslint:disable-next-line:no-console
        this.handleOnClick(data.step);
      })
    })
  }
  getStatus(step) {
    return step.current ? 'current' : step.status;
  }
  getStepClass(step: Step): string {
    if (step.current) {
      return 'bx--progress-step--current';
    }
    if (step.status === 'complete') {
      return 'bx--progress-step--complete';
    }
    return 'bx--progress-step--incomplete';
  }
  handleOnClick(step: Step) {
    this.stepItems.forEach(item => {
      item.step.current = false;
      if (item.step.label === step.label) {
        item.step.current = true;
      }
    })
  }
}
