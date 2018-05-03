import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'carbon-stepper-circle',
  templateUrl: './stepper-circle.component.html',
  styleUrls: ['./stepper-circle.component.scss']
})
export class StepperCircleComponent implements OnInit {
  @Input() stepStatus: string;
  @Input() step: Step;

  status: string;

  constructor() { }
  ngOnInit() {
  }

  getStatus() {
    return this.step.current ? 'current' : this.step.status;
  }

}
