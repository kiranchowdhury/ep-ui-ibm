import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Step } from '../../../@carbon/stepper/step';
import { Group } from '../../../@core/auth/auth.state';


@Component({
  selector: 'ep-leadspace',
  templateUrl: './leadspace.component.html',
  styleUrls: ['./leadspace.component.scss']
})
export class LeadspaceComponent implements OnInit {

@Output() startEvent = new EventEmitter<Group>();

  constructor() { }

  ngOnInit() {
  }

  onStart() {
    this.startEvent.emit();
  }

}
