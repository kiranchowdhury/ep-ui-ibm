import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalService } from '../../../@carbon/modal';
import { LoginResponse } from '../../../@core/login/login.contract';
import { LoginService } from '../../../@core/login/login.service';
import { SessionStorageService } from '../../../@core/session-storage/session-storage.service';
import { LocalStorageService } from '../../../@core/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@models/app-state';
import { ActionSignIn, selectorLogin } from '../../../@core/login/login.reducer';
import { LoginState } from '../../../@core/login/login.state';
import { BusyState } from '../../../@shared/busy-indicator/busy-state';


@Component({
  selector: 'ep-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

 // loading: BusyState;
  loading: boolean = false;
  loadingMsg: string = '';
  authForm: FormGroup
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.authForm = this.fb.group({
      'env': new FormControl('cdtdevdir'),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
  }

  handleLoadingChange(loadingState: BusyState) {
   // this.loading = loadingState;
  }


  ngOnInit() {
    this.store.select(selectorLogin)
    .subscribe((loginState: LoginState) => {
      this.loading = loginState.loading;
      this.loadingMsg = loginState.loadingMsg;
    })
  }

  openModal() {
    this.modalService.open('sign-in');
  }

  onLogin() {
    // this.store.select(selectorLogin)
    // .subscribe((loginState: LoginState) => {
    //   this.loading = loginState.loading;
    // })
    console.log('Login Payload', this.authForm.value);
    this.store.dispatch(new ActionSignIn(this.authForm.value));
  }
}
