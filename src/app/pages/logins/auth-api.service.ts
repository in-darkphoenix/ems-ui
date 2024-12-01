import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';

import { ILoginRequestBody, ILoginResponse } from '../../types/login.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private AUTH_URL = 'http://localhost:4500/api/auths';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(loginRequestBody: ILoginRequestBody) {
    return this.http.post<ILoginResponse>(
      `${this.AUTH_URL}/login`,
      loginRequestBody
    );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_in');

    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: string = localStorage.getItem('expires_in') || '0';
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
