import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Group } from '../../../@core/auth/auth.state';

@Component({
  selector: 'ep-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  @Input() groups: Group[];
  @Input()selectedGroupCode: string;
  @Output() selectGroupEvent: EventEmitter<{value: string, text: string}> =  new EventEmitter();
  roleForm: FormGroup;

 // groups: FormControl;
  constructor() { }

  ngOnInit() {
    this.roleForm = new FormGroup({
      groups: new FormControl()
    });
  }

  onStart(option) {
    this.selectGroupEvent.emit(option);
  }

}
