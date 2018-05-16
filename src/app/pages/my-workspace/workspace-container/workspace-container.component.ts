import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@models/app-state';
import { UserService } from '../../../@core/context/user.service';
import { AuthState } from '../../../@core/auth/auth.state';

@Component({
  selector: 'ep-workspace-container',
  templateUrl: './workspace-container.component.html',
  styleUrls: ['./workspace-container.component.scss']
})
export class WorkspaceContainerComponent implements OnInit {

  constructor(private store: Store<AppState>, private userContext: UserService) { }

  ngOnInit() {
  }

  getSavedCriteria() {

  }

  handleSavedCriteriaChange() {

  }

}
