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
import { AccountsApiService } from '../accounts/accounts-api.service';
import { CategoriesApiService } from './../categories/categories-api.service';
import { TransactionRequestBody } from '../../types/transaction.types';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogboxComponent } from '../../components/ui/confirm-dialogbox/confirm-dialogbox.component';

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
    amount: this.fb.control('', [
      Validators.required,
      Validators.min(0.0),
      Validators.max(99999999.99),
    ]),
    description: this.fb.control('', [Validators.maxLength(300)]),
    notes: this.fb.control('', [Validators.maxLength(500)]),
    transaction_type: this.fb.control('DEBIT'),
    account: this.fb.control('', [Validators.required]),
    category: this.fb.control('', [Validators.required]),
    transaction_date: this.fb.control(''),
  });

  transactionDataSource = new MatTableDataSource();
  columns = [
    'title',
    'amount',
    'description',
    'account',
    'category',
    'type',
    'logged_at',
    'action',
  ];
  accounts: { value: string; name: string }[] = [];
  categories: { value: string; name: string }[] = [];
  transactionTypes: { value: string; name: string }[] = [];
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private transactionsApiService: TransactionsApiService,
    private accountsApiService: AccountsApiService,
    private categoriesApiService: CategoriesApiService
  ) {
    this.transactionTypes = [
      {
        value: 'DEBIT',
        name: 'DEBIT',
      },
      {
        value: 'CREDIT',
        name: 'CREDIT',
      },
    ];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    this.minDate = new Date(currentYear - 1, 12, 1);
    this.maxDate = new Date(currentYear + 0, currentMonth, currentDate);

    this.getAllCategories();
    this.getAllAccounts();
    this.getAllTransactions();
  }

  clearForm() {
    this.transactionsForm.reset();
    this.transactionsForm.get('transaction_type')?.setValue('DEBIT');
  }

  logTransaction() {
    const addTransactionFormInput: TransactionRequestBody = {
      title: this.transactionsForm.get('title')?.value,
      amount: this.transactionsForm.get('amount')?.value,
      description: this.transactionsForm.get('description')?.value || null,
      account: this.transactionsForm.get('account')?.value,
      transaction_offset: this.transactionsForm.get('transaction_type')?.value,
      category: this.transactionsForm.get('category')?.value,
      created_at: this.transactionsForm.get('transaction_date')?.value || null,
      user: '6bd3786c-641b-46fc-a370-c92f774ebf92',
    };

    this.transactionsApiService
      .addTransaction(addTransactionFormInput)
      .subscribe({
        next: (res) => {
          this.clearForm();
          this.getAllTransactions();
          this.snackBar.open(res.message, 'Dismiss', {
            duration: 2000,
          });
        },
      });
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

  getAllTransactions() {
    this.transactionsApiService.getTransactions().subscribe({
      next: (res) => {
        this.transactionDataSource.data = res.data;
      },
    });
  }

  getAllCategories() {
    this.categoriesApiService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data.map((e: any) => {
          const obj: { value: string; name: string } = {
            name: e.category_name,
            value: e.category_id,
          };
          return obj;
        });
      },
    });
  }

  getAllAccounts() {
    this.accountsApiService.getAccounts().subscribe({
      next: (res) => {
        this.accounts = res.data.map((e: any) => {
          const obj: { value: string; name: string } = {
            name: e.account_name,
            value: e.account_id,
          };
          return obj;
        });
      },
    });
  }

  deleteTransaction(transactionId: string) {
    let dialogRef = this.dialog.open(ConfirmDialogboxComponent, {
      data: {
        title: 'Delete Confirmation',
        message:
          'This will delete the transaction. Are you sure you want to delete this transaction?',
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogRes: boolean) => {
        if (dialogRes) {
          this.transactionsApiService
            .deleteTransaction(transactionId)
            .subscribe({
              next: (apiRes) => {
                this.getAllTransactions();
                this.snackBar.open(apiRes.message, 'Dismiss', {
                  duration: 2000,
                });
              },
            });
        }
      },
    });
  }
}
