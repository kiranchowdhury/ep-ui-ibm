import { Injectable } from '@angular/core';
import { UserService } from '../../../@core/context/user.service';
import { ApiConnectorService } from '../../../@core/api-handlers/api-connector.service';
import { LoadCriteriaResponse, LoadCriteriaRequest } from './saved-criteria.contracts';
import { AuthState } from '../../../@core/auth/auth.state';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SearchCriteria } from './search-criteria.state';

@Injectable()
export class ManageCriteriaService {
  mqCriteriteria: SearchCriteria;
  anotherCriteria: SearchCriteria;
  constructor(
    private apiConnector: ApiConnectorService) { }

 public getSavedCriteria(payload: LoadCriteriaRequest): Observable<LoadCriteriaResponse> {
   // lets get the user context ..
   return  this.apiConnector.get('/api/get/savedcriteria', payload)
   .pipe(
     map((data: LoadCriteriaResponse) => this.treatCriteriaResponse(data)),
   )
 }

 private treatCriteriaResponse(data: LoadCriteriaResponse): LoadCriteriaResponse {
    if (data.savedCriterias && data.savedCriterias.length > 0) {
      return data;
    } else {
      // First time user.. no pref yet
      this.mqCriteriteria = {
        code: 'MQ',
        name: 'My Quotes',
        default: true,
        lastSelected: true,
      }
      this.anotherCriteria = {
        code: 'DM',
        name: 'Dummy Criteria 1',
        default: false,
        lastSelected: false,
      }
      data.savedCriterias = [];
      data.savedCriterias.push(this.mqCriteriteria);
      data.savedCriterias.push(this.anotherCriteria);
      return data;
    }
 }
}
