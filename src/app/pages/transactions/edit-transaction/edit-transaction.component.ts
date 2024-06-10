import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss',
})
export class EditTransactionComponent {
  editTransactionForm: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.maxLength(300)]),
    transaction_type: this.fb.control('DEBIT'),
    account: this.fb.control('', [Validators.required]),
    category: this.fb.control('', [Validators.required]),
    transaction_date: this.fb.control(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public editAccountPopup: {},
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTransactionComponent>
  ) {}

  edit() {
    this.dialogRef.close(this.editTransactionForm.value);
  }

  cancel() {
    this.dialogRef.close({ cancel: true });
  }
}
