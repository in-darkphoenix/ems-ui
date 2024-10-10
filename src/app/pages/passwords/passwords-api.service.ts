import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAddPasswordResponse,
  IPasswordRequestBody,
  IPasswordResponse,
} from '../../types/password.types';

@Injectable({
  providedIn: 'root',
})
export class PasswordsApiService {
  private PASSWORDS_URL = 'http://localhost:4500/api/passwords/';

  constructor(private http: HttpClient) {}

  getPasswords() {
    return this.http.get<IPasswordResponse>(this.PASSWORDS_URL);
  }

  addPassword(passwordRequestBody: IPasswordRequestBody) {
    return this.http.post<IAddPasswordResponse>(
      `${this.PASSWORDS_URL}`,
      passwordRequestBody
    );
  }

  deletePassword(passwordId: string) {
    return this.http.delete<IAddPasswordResponse>(
      `${this.PASSWORDS_URL}${passwordId}`
    );
  }

  editPassword(passwordId: string, passwordRequestBody: IPasswordRequestBody) {
    return this.http.put<IAddPasswordResponse>(
      `${this.PASSWORDS_URL}${passwordId}`,
      passwordRequestBody
    );
  }
}
