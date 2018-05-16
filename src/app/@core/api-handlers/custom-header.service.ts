import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class CustomHeaderService {

  constructor(private localStorage: LocalStorageService) { }


  public getHeaderParam(key): string {
    return this.localStorage.getItem(key) ? this.localStorage.getItem(key) : '';
  }

  public saveHeaderParam(key, val): void {
    this.localStorage.setItem(key, val);
  }

  public removeHeaderParam(key): void {
    this.localStorage.destroyItem(key);
  }

}
