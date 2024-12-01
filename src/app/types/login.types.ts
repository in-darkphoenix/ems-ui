export interface ILoginRequestBody {
  username: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  id_token: string;
  expires_in: string;
}
