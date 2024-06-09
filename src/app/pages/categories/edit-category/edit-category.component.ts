import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryRequestBody } from '../../../types/category.types';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent {
  editCategoryForm: FormGroup = this.fb.group({
    category_name: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.maxLength(500)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public editCategoryPopup: CategoryRequestBody,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCategoryComponent>
  ) {
    this.editCategoryForm
      .get('category_name')
      ?.setValue(editCategoryPopup.category_name);
    this.editCategoryForm
      .get('description')
      ?.setValue(editCategoryPopup.description);
  }

  edit() {
    this.dialogRef.close(this.editCategoryForm.value);
  }

  cancel() {
    this.dialogRef.close({ cancel: true });
  }
}
