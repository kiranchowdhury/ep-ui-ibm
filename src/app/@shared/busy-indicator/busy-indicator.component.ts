import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../@models/app-state';
import { BusyState } from './busy-state';


@Component({
  selector: 'ep-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent implements OnInit {

  @Output() notifyBusyChange: EventEmitter<BusyState> = new EventEmitter();
  loading: boolean = false;
  @Input()loadingMsg: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.store.select((state) => state)
    // .subscribe(appState => {
    //   if (appState) {
    //     this.loading = (appState.auth && appState.auth.loading) ||
    //                    (appState.login && appState.login.loading)
    //     this.loadingMsg = (appState.auth ? appState.auth.loadingMsg : '') ||
    //                       (appState.login ? appState.login.loadingMsg : '')
    //     this.notifyBusyChange.emit({busy: this.loading, message: this.loadingMsg})
    //   }
    // })
  }

}
