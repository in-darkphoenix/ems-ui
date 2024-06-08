import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService {
  constructor(private http: HttpClient) {}

  editAccount(
    accountId: string,
    accountRequestBody: {
      account_name: string;
      description: string;
    }
  ) {
    return this.http.patch<{ message: string }>(
      `http://localhost:4500/api/accounts/${accountId}`,
      accountRequestBody
    );
  }

  addAccount(accountRequestBody: {
    account_name: string;
    description: string;
  }) {
    return this.http.post<{ message: string }>(
      `http://localhost:4500/api/accounts/`,
      accountRequestBody
    );
  }

  getAccounts() {
    return this.http.get<{
      message: string;
      data: [];
    }>(`http://localhost:4500/api/accounts/`);
  }

  deleteAccount(accountId: string) {
    return this.http.delete<{ message: string }>(
      `http://localhost:4500/api/accounts/${accountId}`
    );
  }

  getAccountById(accountId: string) {
    return this.http.get<{
      message: string;
      data: {};
    }>(`http://localhost:4500/api/accounts/${accountId}`);
  }
}
