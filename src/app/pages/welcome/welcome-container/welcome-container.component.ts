import { Component, OnInit } from '@angular/core';
import { Group } from '../../../@core/auth/auth.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@models/app-state';
import { ActionLoadGroup, selectorAuth, ActionSelectGroup } from '../../../@core/auth/auth.reducer';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { SelectGroupRequest } from '../../../@core/auth/auth.contract';
import { BusyState } from '../../../@shared/busy-indicator/busy-state';

@Component({
  selector: 'ep-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss']
})
export class WelcomeContainerComponent implements OnInit {
 // loading: BusyState;
    loading: boolean;
    loadingMsg: string = '';
    hideContent = false;
  initialized = false;
  computerimg = require('../../../../assets/images/landing_icon_computer.png');

  authGroups: Group[] = [];

  selectedGroupCode;
  selectedGroupName;
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(selectorAuth)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(authState => {
      this.loading = authState.loading;
      this.loadingMsg = authState.loadingMsg;
      this.authGroups = authState.groups;
      this.selectedGroupCode = authState.selectedGroupCode;
      if (!this.initialized) {
        this.initialized = true;
        this.store.dispatch(new ActionLoadGroup({apiid: 'getAuthGroup', methodname: 'getIBMAuthorizedGroup'}));
      }
    })
  }
  handleGroupSelect(selectedGroup: {value: string, text: string}) {
    this.selectedGroupCode = selectedGroup.value;
    this.selectedGroupName = selectedGroup.text;
  }

  onStartClick() {
    this.hideContent = true;
    const payload: SelectGroupRequest = {
      apiid: 'getAuthGroup',
      methodname: 'getSelectedIBMGroupInfo',
      selectedgroup: this.selectedGroupCode
    }
    this.store.dispatch(new ActionSelectGroup(payload));
  }

  handleLoadingChange(loadingState: BusyState) {
    // this.loading = loadingState;
  }

}
