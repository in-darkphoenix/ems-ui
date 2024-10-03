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

  accounts: { value: string; name: string }[] = [];
  categories: { value: string; name: string }[] = [];
  transactionTypes: { value: string; name: string }[] = [];
  minDate: Date;
  maxDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public editTransactionPopup: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTransactionComponent>
  ) {
    this.minDate = editTransactionPopup.minDate;
    this.maxDate = editTransactionPopup.maxDate;
    this.accounts = editTransactionPopup.accounts;
    this.categories = editTransactionPopup.categories;
    this.transactionTypes = editTransactionPopup.transactionTypes;

    this.editTransactionForm.get('title')?.setValue(editTransactionPopup.title);
    this.editTransactionForm
      .get('amount')
      ?.setValue(editTransactionPopup.amount);
    this.editTransactionForm
      .get('description')
      ?.setValue(editTransactionPopup.description);
    this.editTransactionForm
      .get('transaction_type')
      ?.setValue(editTransactionPopup.transaction_offset);
    this.editTransactionForm
      .get('account')
      ?.setValue(editTransactionPopup.account.account_name);
    this.editTransactionForm
      .get('category')
      ?.setValue(editTransactionPopup.category.category_name);
    this.editTransactionForm
      .get('transaction_date')
      ?.setValue(editTransactionPopup.created_at);
  }

  buildForm() {}

  edit() {
    this.dialogRef.close(this.editTransactionForm.value);
    console.log(this.editTransactionForm.value);
  }

  cancel() {
    this.dialogRef.close({ cancel: true });
  }
}
