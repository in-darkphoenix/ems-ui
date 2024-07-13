export interface Transaction {
  transaction_id: string;
  title: string;
  amount: number;
  description: string;
  account: string;
  transaction_offset: string;
  category: string;
  user: string;
  created_at?: Date;
}

export interface TransactionRequestBody {
  title: string;
  amount: number;
  description: string;
  account: string;
  transaction_offset: string;
  category: string;
  user: string;
  created_at?: Date;
}

export interface TransactionsResponse {
  message: string;
  data: [];
}

export interface TransactionResponse {
  message: string;
  data?: {};
}
