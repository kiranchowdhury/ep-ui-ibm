import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';

@Injectable()
export class JwtService {

  constructor(private sessionStorage: SessionStorageService) { }

  getToken(): String {
    return this.sessionStorage.getItem('jwtToken');
  }

  saveToken(token: String): void {
    this.sessionStorage.setItem('jwtToken', token);
  }

  removeToken(): void {
    this.sessionStorage.destroyItem('jwtToken');
  }

}
