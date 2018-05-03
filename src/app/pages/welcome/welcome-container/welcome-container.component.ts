import { Component, OnInit } from '@angular/core';
import { Group } from '../../../@core/auth/auth.state';

@Component({
  selector: 'ep-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss']
})
export class WelcomeContainerComponent implements OnInit {

  computerimg = require('../../../../assets/images/landing_icon_computer.png');

  authGroups: Group[] = [{
    code: 'GITC_TRN_NA',
    name: 'GITC TRN NA'
  }, {
    code: 'GITC_TRN_EM',
    name: 'GITC TRN EMEA'
  }, {
    code: 'GITC_TRN_LA',
    name: 'GITC TRN LA'
  }, {
    code: 'GITC_TRN_AP',
    name: 'GITC TRN AP'
  }];

  selectedGroupCode = 'GITC_TRN_NA';

  constructor() { }

  ngOnInit() {
  }

}
