import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  TransactionRequestBody,
  TransactionResponse,
  TransactionsResponse,
} from '../../types/transaction.types';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApiService {
  private TRANSACTIONS_URL = 'http://localhost:4500/api/transactions/';
  private SUMMARY_URL = 'http://localhost:4500/api/summaries/';

  constructor(private http: HttpClient) {}

  editTransaction(
    transactionId: string,
    transactionRequestBody: TransactionRequestBody
  ) {
    return this.http.put<TransactionResponse>(
      `${this.TRANSACTIONS_URL}${transactionId}`,
      transactionRequestBody
    );
  }

  addTransaction(transactionRequestBody: TransactionRequestBody) {
    return this.http.post<TransactionResponse>(
      `${this.TRANSACTIONS_URL}`,
      transactionRequestBody
    );
  }

  getTransactions() {
    return this.http.get<TransactionsResponse>(`${this.TRANSACTIONS_URL}`);
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete<TransactionResponse>(
      `${this.TRANSACTIONS_URL}${transactionId}`
    );
  }

  generatePDF() {
    return this.http.get(`${this.SUMMARY_URL}/getpdf?month=9&year=2024`, {
      responseType: 'blob',
    });
  }
}
