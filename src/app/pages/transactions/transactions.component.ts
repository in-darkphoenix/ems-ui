import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionsApiService } from './transactions-api.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  transactionsForm: FormGroup = this.fb.group({
    transaction_id: this.fb.control('0'),
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.maxLength(300)]),
    notes: this.fb.control('', [Validators.maxLength(500)]),
    transaction_type: this.fb.control('DEBIT'),
    account: this.fb.control('', [Validators.required]),
    category: this.fb.control('', [Validators.required]),
    transaction_date: this.fb.control(''),
  });
  accounts: { value: string; name: string }[] = [];
  categories: { value: string; name: string }[] = [];
  transactionTypes: { value: string; name: string }[] = [];
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private transactionsApiService: TransactionsApiService
  ) {
    this.accounts = [
      {
        value: '66022b27-8d9c-4ff2-993e-07c09bb52af6',
        name: 'SBI Bank',
      },
      {
        value: '49f2ca0f-6b8b-461c-a6a9-16dea63f2dcf',
        name: 'Axis Bank',
      },
      {
        value: '53d89d39-bc90-403f-9790-bf9373d726bb',
        name: 'Cash',
      },
    ];

    this.categories = [
      {
        value: '66022b27-8d9c-4ff2-993e-07c09bb52af6',
        name: 'dadadad',
      },
      {
        value: '49f2ca0f-6b8b-461c-a6a9-16dea63f2dcf',
        name: 'fgfghfh',
      },
      {
        value: '53d89d39-bc90-403f-9790-bf9373d726bb',
        name: 'hiouio',
      },
    ];

    this.transactionTypes = [
      {
        value: 'DEBIT',
        name: 'debit',
      },
      {
        value: 'CREDIT',
        name: 'credit',
      },
    ];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    this.minDate = new Date(currentYear - 1, 12, 1);
    this.maxDate = new Date(currentYear + 0, currentMonth, currentDate);
  }

  clearForm() {
    this.transactionsForm.reset();
  }

  logTransaction() {
    const obj = {
      title: this.transactionsForm.get('title')?.value,
      description: this.transactionsForm.get('description')?.value,
      notes: this.transactionsForm.get('notes')?.value,
      account: this.transactionsForm.get('account')?.value,
      type: this.transactionsForm.get('transaction_type')?.value,
      category: this.transactionsForm.get('category')?.value,
      date: this.transactionsForm.get('transaction_date')?.value,
    };

    console.log(obj);
    this.clearForm();
  }

  editTransaction(transactionBody: {}) {
    let dialogRef = this.dialog.open(EditTransactionComponent, {
      height: 'auto',
      width: '2000px',
      data: {
        // account_name: transactionBody.account_name,
        // description: accountBody.description,
        date: this.minDate,
      },
    });
  }
}
