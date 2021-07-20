// Generated by https://quicktype.io
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  has2FA: boolean;
  img?: string;
}
