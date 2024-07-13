import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogboxComponent } from '../../components/ui/confirm-dialogbox/confirm-dialogbox.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsApiService } from './accounts-api.service';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { Account } from '../../types/account.types';

@Component({
  selector: 'accounts',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  dataSource = new MatTableDataSource();
  accountsForm: FormGroup = this.fb.group({
    account_id: this.fb.control('0'),
    account_name: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.maxLength(500)]),
    created_at: this.fb.control(''),
  });
  columns = ['account_name', 'description', 'created_at', 'action'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private accountsApiService: AccountsApiService
  ) {
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
      description: this.accountsForm.get('description')?.value || null,
    };

    this.accountsApiService.addAccount(addAccountFormInput).subscribe({
      next: (res) => {
        this.accountsForm.reset();
        // this.accountsForm.get('month')?.setValue(null);
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
              this.getAllAccounts();
              this.snackBar.open(apiRes.message, 'Dismiss', {
                duration: 2000,
              });
            },
          });
        }
      },
    });
  }

  editAccount(accountBody: Account) {
    let dialogRef = this.dialog.open(EditAccountComponent, {
      height: 'auto',
      width: '2000px',
      data: {
        account_name: accountBody.account_name,
        description: accountBody.description,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogRes) => {
        if (!dialogRes.cancel) {
          this.accountsApiService
            .editAccount(accountBody.account_id, dialogRes)
            .subscribe({
              next: (apiRes) => {
                this.getAllAccounts();
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
