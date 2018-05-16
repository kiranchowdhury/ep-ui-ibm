import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import { catchError } from 'rxjs/operators/catchError';


@Injectable()
export class ApiConnectorService {

  constructor(private http: HttpClient) { }

 private  getQueryString(params): string {
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    console.log('QUERY STRING', queryString);
    return ('?' + queryString);
  }

  private formatErrors(error: any) {
    return new ErrorObservable(error.error);
  }

  get(path: string, payload: Object = {}): Observable<any> {

    return this.http.get(`${environment.base_url}${path}` + this.getQueryString(payload))
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.base_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object): Observable<any> {
    // console.log('API SERVICE BODY', body)
    return this.http.post(
      `${environment.base_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.base_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

}
