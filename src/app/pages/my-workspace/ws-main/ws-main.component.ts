import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@core/context/user.service';
import { AppState } from '../../../@models/app-state';
import { LoadCriteriaRequest } from '../saved-criteria/saved-criteria.contracts';
import { map } from 'rxjs/operators';
import { AuthState } from '../../../@core/auth/auth.state';
import { Store } from '@ngrx/store';
import { LoadSavedCriteria, selectorCriteriaState } from '../saved-criteria/saved-criteria.reducers';
import { SearchCriteriaSate, SearchCriteria } from '../saved-criteria/search-criteria.state';

@Component({
  selector: 'ep-ws-main',
  templateUrl: './ws-main.component.html',
  styleUrls: ['./ws-main.component.scss']
})
export class WsMainComponent implements OnInit {
  loadCriteriaPayload: LoadCriteriaRequest;

  loading = false;
  loadingMsg = '';
  savedCriteras: SearchCriteria[];
  selectedCriteria: SearchCriteria;

  constructor(private userContext: UserService,
              private store: Store<AppState>) { }

  ngOnInit() {
    console.log('#### Getting User Context in WS Main Component####');
    this.userContext.currentUser.subscribe(
      context => {
        console.log('The user auth context obj', context)
        this.store.dispatch(new LoadSavedCriteria({email: context.user.email, group: context.selectedGroupCode}))
      }
    )
    // this.userContext.currentUser.pipe(
    //   map((context: AuthState) => ({email: context.user.email, group: context.selectedGroupCode})),
    //   map((payload: LoadCriteriaRequest) => {
    //     console.log('Dispatching LoadCriteria Actions with payload =', payload);
    //     this.store.dispatch(new LoadSavedCriteria(payload))
    //   })
    // )

    // get the list of saved criteria
    this.store.select(state => state.workspace.savedCriteriaState).subscribe(
      (criteriState: SearchCriteriaSate) => {
        this.savedCriteras = criteriState.savedCriteria;
        this.selectedCriteria = criteriState.lastSelected;
        this.loading = criteriState.loading;
      }
    )
  }
  handleCriteriaChange(newCriteria: SearchCriteria) {
    console.log('Selected Criteria####', newCriteria);
  }

}
