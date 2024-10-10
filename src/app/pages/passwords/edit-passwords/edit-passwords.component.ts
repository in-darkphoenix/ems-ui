import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITransferPasswordBody } from '../../../types/password.types';

@Component({
  selector: 'app-edit-passwords',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './edit-passwords.component.html',
  styleUrl: './edit-passwords.component.scss',
})
export class EditPasswordsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public editPasswordPopup: ITransferPasswordBody,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPasswordsComponent>
  ) {
    this.editPasswordForm
      .get('account_name')
      ?.setValue(editPasswordPopup.account_name);
    this.editPasswordForm
      .get('account_url')
      ?.setValue(editPasswordPopup.account_url);
    this.editPasswordForm
      .get('original_password')
      ?.setValue(
        this.decryptPassword(
          editPasswordPopup.original_password,
          editPasswordPopup.account_name
        )
      );
    this.editPasswordForm
      .get('expiry_date')
      ?.setValue(editPasswordPopup.expiry_date);
  }

  hide: boolean = true;
  editPasswordForm: FormGroup = this.fb.group({
    account_name: this.fb.control('', [
      Validators.maxLength(50),
      Validators.required,
    ]),
    account_url: this.fb.control(''),
    original_password: this.fb.control('', [Validators.required]),
    expiry_date: this.fb.control(''),
  });

  edit() {
    this.dialogRef.close(this.editPasswordForm.value);
  }

  cancel() {
    this.dialogRef.close({ cancel: true });
  }

  decryptPassword(cipher_text: string, secret_key: string) {
    return this.editPasswordPopup.decrypt_hashed_password(
      cipher_text,
      secret_key
    );
  }

  hideShowPassword() {
    this.hide = !this.hide;
    return this.hide;
  }
}
