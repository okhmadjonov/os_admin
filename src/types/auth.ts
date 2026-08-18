import { IUser } from "./user";

export interface AuthState {
  initialized: boolean;
  authenticated: boolean;
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: IUser;
  token: string;
}
