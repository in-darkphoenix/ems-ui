import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountRequestBody,
  AccountsResponse,
  AccountResponse,
} from '../../types/account.types';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService {
  private ACCOUNTS_URL = 'http://localhost:4500/api/accounts/';

  constructor(private http: HttpClient) {}

  editAccount(accountId: string, accountRequestBody: AccountRequestBody) {
    return this.http.put<AccountResponse>(
      `${this.ACCOUNTS_URL}${accountId}`,
      accountRequestBody
    );
  }

  addAccount(accountRequestBody: AccountRequestBody) {
    return this.http.post<AccountResponse>(
      `${this.ACCOUNTS_URL}`,
      accountRequestBody
    );
  }

  getAccounts() {
    return this.http.get<AccountsResponse>(`${this.ACCOUNTS_URL}`);
  }

  deleteAccount(accountId: string) {
    return this.http.delete<AccountResponse>(
      `${this.ACCOUNTS_URL}${accountId}`
    );
  }

  getAccountById(accountId: string) {
    return this.http.get<AccountResponse>(`${this.ACCOUNTS_URL}${accountId}`);
  }
}
