import { Component, OnInit, Input } from '@angular/core';
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
  roleForm: FormGroup;

 // groups: FormControl;
  constructor() { }

  ngOnInit() {
    this.roleForm = new FormGroup({
      groups: new FormControl()
    });
  }

  onStart() {

  }

}
