export interface LoginResponse {
  token: string;
  email: string;
}

export interface RegisterResponse {
  created: Date;
  email: string;
}
export interface LogoutResponse {
  loggedOut: boolean;
}