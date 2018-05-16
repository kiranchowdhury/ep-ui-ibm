import { Injectable } from '@angular/core';
import { ApiConnectorService } from '../api-handlers/api-connector.service';
import { LoginRequest, LoginResponse } from './login.contract';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private apiConnector: ApiConnectorService) { }

  login(payload: LoginRequest): Observable<LoginResponse> {
    console.log('Login payload ', payload);
    return this.apiConnector.post('/api/login', payload)
      .pipe(
        map((data: LoginResponse) => data)
      )
  }

}
