export interface CategoryDS {
  category_id: string;
  category_name: string;
  description: string;
  created_at: Date;
}

export interface Category {
  category_id: string;
  category_name: string;
  description: string;
}

export interface CategoryRequestBody {
  category_name: string;
  description: string;
}

export interface CategoriesResponse {
  message: string;
  data: [];
}

export interface CategoryResponse {
  message: string;
  data?: {};
}
