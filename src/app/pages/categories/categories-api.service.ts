import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CategoryRequestBody,
  CategoryResponse,
  CategoriesResponse,
} from '../../types/category.types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private CATEGORIES_URL = 'http://localhost:4500/api/categories/';

  constructor(private http: HttpClient) {}

  editCategory(categoryId: string, categoryRequestBody: CategoryRequestBody) {
    return this.http.put<CategoryResponse>(
      `${this.CATEGORIES_URL}${categoryId}`,
      categoryRequestBody
    );
  }

  addCategory(categoryRequestBody: CategoryRequestBody) {
    return this.http.post<CategoryResponse>(
      `${this.CATEGORIES_URL}`,
      categoryRequestBody
    );
  }

  getCategories() {
    return this.http.get<CategoriesResponse>(`${this.CATEGORIES_URL}`);
  }

  deleteCategory(categoryId: string) {
    return this.http.delete<CategoryResponse>(
      `${this.CATEGORIES_URL}${categoryId}`
    );
  }

  getCategoryById(categoryId: string) {
    return this.http.get<CategoryResponse>(
      `${this.CATEGORIES_URL}${categoryId}`
    );
  }
}
