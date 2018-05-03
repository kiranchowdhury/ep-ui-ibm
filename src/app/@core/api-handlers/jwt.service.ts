import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class JwtService {

  constructor(private localStorageService: LocalStorageService) { }

  getToken(): String {
    return this.localStorageService.getItem('jwtToken');
  }

  saveToken(token: String): void {
    this.localStorageService.setItem('jwtToken', token);
  }

  removeToken(): void {
    this.localStorageService.destroyItem('jwtToken');
  }

}
