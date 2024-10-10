// export interface IPassword {
//   category_id: string;
//   category_name: string;
//   description: string;
// }

export interface ITransferPasswordBody {
  account_name: string;
  account_url: string;
  original_password: string;
  expiry_date: Date;
  decrypt_hashed_password: (arg0: string, arg1: string) => string;
}

export interface IPasswordRequestBody {
  account_name: string;
  account_url: string;
  original_password: string;
  expiry_date: Date;
}

export interface IPasswordEditBody {
  password_id: string;
  account_name: string;
  account_url: string;
  original_password: string;
  expiry_date: Date;
}

export interface IPasswordResponse {
  message: string;
  data: [];
}

export interface IAddPasswordResponse {
  message: string;
}

// export interface CategoryResponse {
//   message: string;
//   data?: {};
// }
export interface IPasswordCard {
  password_id: string;
  account_name: string;
  account_url: string;
  hide: boolean;
  hashed_password?: string;
  expiry_date: Date;
  created_at: Date;
  updated_at: Date;
}
