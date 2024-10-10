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
import CryptoJS from 'crypto-js';
const { AES, enc } = CryptoJS;
import { PasswordsApiService } from '../passwords/passwords-api.service';
import {
  IPasswordCard,
  IPasswordEditBody,
  IPasswordRequestBody,
} from '../../types/password.types';
import { ConfirmDialogboxComponent } from '../../components/ui/confirm-dialogbox/confirm-dialogbox.component';
import { EditPasswordsComponent } from './edit-passwords/edit-passwords.component';

@Component({
  selector: 'app-passwords',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.scss',
})
export class PasswordsComponent {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private passwordsApiService: PasswordsApiService
  ) {
    this.getAllPasswords();
  }

  passwordForm: FormGroup = this.fb.group({
    password_id: this.fb.control('0'),
    account_name: this.fb.control('', [
      Validators.maxLength(50),
      Validators.required,
    ]),
    account_url: this.fb.control(''),
    original_password: this.fb.control('', [Validators.required]),
    expiry_date: this.fb.control(''),
  });
  passwordDataSource: IPasswordCard[] = [];

  getAllPasswords() {
    this.passwordsApiService.getPasswords().subscribe({
      next: (res) => {
        this.passwordDataSource = res.data;
        this.passwordDataSource.map((e) => (e.hide = true));
      },
    });
  }

  createPasswordLog() {
    const addPasswordFormInput: IPasswordRequestBody = {
      account_name: this.passwordForm.get('account_name')?.value,
      account_url: this.passwordForm.get('account_url')?.value || null,
      original_password: this.passwordForm.get('original_password')?.value,
      expiry_date: this.passwordForm.get('expiry_date')?.value || null,
    };

    this.passwordsApiService.addPassword(addPasswordFormInput).subscribe({
      next: (res) => {
        this.clearForm();
        this.getAllPasswords();
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 2000,
        });
      },
    });
  }

  deletePasswordLog(passwordId: string = '0') {
    let dialogRef = this.dialog.open(ConfirmDialogboxComponent, {
      data: {
        title: 'Delete Confirmation',
        message:
          'This will delete the Password Log. Are you sure you want to delete this Log?',
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogRes: boolean) => {
        if (dialogRes) {
          this.passwordsApiService.deletePassword(passwordId).subscribe({
            next: (apiRes) => {
              this.getAllPasswords();
              this.snackBar.open(apiRes.message, 'Dismiss', {
                duration: 2000,
              });
            },
          });
        }
      },
    });
  }

  editPassword(passwordBody: IPasswordCard) {
    let dialogRef = this.dialog.open(EditPasswordsComponent, {
      height: 'auto',
      width: '2000px',
      data: {
        account_name: passwordBody.account_name,
        account_url: passwordBody.account_url,
        expiry_date: passwordBody.expiry_date,
        original_password: passwordBody.hashed_password,
        decrypt_hashed_password: this.decryptHashedPassword
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogRes) => {
        if (!dialogRes.cancel) {
          this.passwordsApiService
            .editPassword(passwordBody.password_id, dialogRes)
            .subscribe({
              next: (apiRes) => {
                this.getAllPasswords();
                this.snackBar.open(apiRes.message, 'Dismiss', {
                  duration: 2000,
                });
              },
            });
        }
      },
    });
  }

  clearForm() {
    this.passwordForm.reset();
  }

  addHttp(url: string = 'NA'): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }

  convertUTCToLocalDateTime(utcDateStr: Date = new Date()) {
    const utcDate: Date = new Date(utcDateStr);

    const localDate = new Date(
      utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
    );

    const localDateTime = localDate.toLocaleString('en-US', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return localDateTime;
  }

  togglePasswordVisibility(card: IPasswordCard): void {
    card.hide = !card.hide;
  }

  decryptHashedPassword(
    ciphertext: string = 'demo',
    account_name: string = 'demo'
  ) {
    const bytes = AES.decrypt(ciphertext, account_name);
    const originalPassword = bytes.toString(enc.Utf8);
    return originalPassword;
  }
}
