import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountRequestBody } from '../../../types/account.types';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent {
  editAccountForm: FormGroup = this.fb.group({
    account_name: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.maxLength(500)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public editAccountPopup: AccountRequestBody,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAccountComponent>
  ) {
    this.editAccountForm
      .get('account_name')
      ?.setValue(editAccountPopup.account_name);
    this.editAccountForm
      .get('description')
      ?.setValue(editAccountPopup.description);
  }

  edit() {
    this.dialogRef.close(this.editAccountForm.value);
  }

  cancel() {
    this.dialogRef.close({ cancel: true });
  }
}
