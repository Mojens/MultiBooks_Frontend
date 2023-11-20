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

export interface ForgotPwdResponse {
  data: string;
  message: string;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPwdRequest {
  resetToken: string;
  password: string;
  confirmPassword: string;
}
