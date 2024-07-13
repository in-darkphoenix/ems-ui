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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesApiService } from './categories-api.service';
import { ConfirmDialogboxComponent } from '../../components/ui/confirm-dialogbox/confirm-dialogbox.component';
import { Category } from '../../types/category.types';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categoriesForm: FormGroup = this.fb.group({
    category_id: this.fb.control('0'),
    category_name: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.maxLength(500)]),
    created_at: this.fb.control(''),
  });
  categoryDataSource = new MatTableDataSource();
  columns = ['category_name', 'description', 'created_at', 'action'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoriesApiService: CategoriesApiService
  ) {
    this.getAllCategories();
  }

  editCategory(categoryBody: Category) {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      height: 'auto',
      width: '2000px',
      data: {
        category_name: categoryBody.category_name,
        description: categoryBody.description,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogRes) => {
        if (!dialogRes.cancel) {
          this.categoriesApiService
            .editCategory(categoryBody.category_id, dialogRes)
            .subscribe({
              next: (apiRes) => {
                this.getAllCategories();
                this.snackBar.open(apiRes.message, 'Dismiss', {
                  duration: 2000,
                });
              },
            });
        }
      },
    });
  }

  addCategory() {
    const addCategoryFormInput = {
      category_name: this.categoriesForm.get('category_name')?.value,
      description: this.categoriesForm.get('description')?.value || null,
    };

    this.categoriesApiService.addCategory(addCategoryFormInput).subscribe({
      next: (res) => {
        this.categoriesForm.reset();
        this.getAllCategories();
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 2000,
        });
      },
    });
  }

  getAllCategories() {
    this.categoriesApiService.getCategories().subscribe({
      next: (res) => {
        this.categoryDataSource.data = res.data;
      },
    });
  }

  deleteCategory(categoryId: string) {
    let dialogRef = this.dialog.open(ConfirmDialogboxComponent, {
      data: {
        title: 'Delete Confirmation',
        message:
          'This will delete the category. Are you sure you want to delete this account?',
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogRes: boolean) => {
        if (dialogRes) {
          this.categoriesApiService.deleteCategory(categoryId).subscribe({
            next: (apiRes) => {
              this.getAllCategories();
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
