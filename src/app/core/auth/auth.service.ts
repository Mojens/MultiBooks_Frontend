import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../@shared/api.config'
import { ApiResponse } from "../../@shared/api.response";
import * as authModels from '../../models/Auth/auth.models';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private tokenKey = "token_key"
  private URL = API_URL+'auth'

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(username: string, password: string): Observable<ApiResponse<any>> {
    const loginUrl = `${this.URL}/login`;
    return this.http.post<ApiResponse<authModels.LoginResponse>>(loginUrl, { username, password }, this.httpOptions);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    return this.http.post(`${this.URL}/logout`, {},this.httpOptions);
  }

}
