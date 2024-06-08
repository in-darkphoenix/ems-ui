export interface AccountDS {
  account_id: string;
  account_name: string;
  description: string;
  created_at: Date;
}

export interface Account {
  account_id: string;
  account_name: string;
  description: string;
}

export interface AccountRequestBody {
  account_name: string;
  description: string;
}

export interface AccountsResponse {
  message: string;
  data: [];
}

export interface AccountResponse {
  message: string;
  data?: {};
}
