import { Injectable } from '@angular/core';
import { LoadGroupsRequest, LoadGroupsResponse, SelectGroupRequest, SelectGroupResponse } from './auth.contract';
import { Observable } from 'rxjs/Observable';
import { ApiConnectorService } from '../api-handlers/api-connector.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
    constructor(private apiConnector: ApiConnectorService) {}

    loadGroups(payload: LoadGroupsRequest): Observable<LoadGroupsResponse> {
        console.log('CAlling Auth Service with payload' + payload);
        return this.apiConnector.get('/api/get', payload)
        .pipe(
            map((response: LoadGroupsResponse) => response)
        )
    }

    selectGroup(payload: SelectGroupRequest): Observable<SelectGroupResponse> {
        console.log('Calling Select Group api with payload', payload);
        return this.apiConnector.get('/api/get', payload)
        .pipe(
            map((response: SelectGroupResponse) => response)
        )
    }
}
