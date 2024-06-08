import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Test } from '../../types/types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogboxComponent } from '../../components/ui/confirm-dialogbox/confirm-dialogbox.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsApiService } from './accounts-api.service';

@Component({
  selector: 'accounts',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  years: number[] = [];
  months: { index: number; name: string }[] = [];
  dataSource = new MatTableDataSource<{
    account_id: string;
    account_name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  }>();
  accountsForm: FormGroup = this.fb.group({
    account_id: this.fb.control('0'),
    account_name: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.maxLength(500)]),
    created_at: this.fb.control(''),
    year: this.fb.control(2024),
    month: this.fb.control(null),
  });
  columns = ['account_name', 'description', 'created_at', 'action'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private accountsApiService: AccountsApiService
  ) {
    for (let year = new Date().getFullYear(); year >= 2021; year--)
      this.years.push(year);

    this.months = [
      { index: 0, name: 'January' },
      { index: 1, name: 'February' },
      { index: 2, name: 'March' },
      { index: 3, name: 'April' },
      { index: 4, name: 'May' },
      { index: 5, name: 'June' },
      { index: 6, name: 'July' },
      { index: 7, name: 'August' },
      { index: 8, name: 'September' },
      { index: 9, name: 'October' },
      { index: 10, name: 'November' },
      { index: 11, name: 'December' },
    ];

    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountsApiService.getAccounts().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
      },
    });
  }

  addAccount() {
    const addAccountFormInput = {
      account_name: this.accountsForm.get('account_name')?.value,
      description: this.accountsForm.get('description')?.value,
    };

    this.accountsApiService.addAccount(addAccountFormInput).subscribe({
      next: (res) => {
        this.accountsForm.reset();
        this.accountsForm.get('month')?.setValue(null);
        this.getAllAccounts();
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 2000,
        });
      },
    });
  }

  deleteAccount(accountId: string) {
    let dialogRef = this.dialog.open(ConfirmDialogboxComponent, {
      data: {
        title: 'Delete Confirmation',
        message:
          'This will delete the account. Are you sure you want to delete this account?',
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogRes: boolean) => {
        if (dialogRes) {
          this.accountsApiService.deleteAccount(accountId).subscribe({
            next: (apiRes) => {
              this.snackBar.open(apiRes.message, 'Dismiss', {
                duration: 2000,
              });
            },
          });
        }
      },
    });
  }

  editAccount(accountBody: Test) {
    console.log(accountBody);
  }
}
