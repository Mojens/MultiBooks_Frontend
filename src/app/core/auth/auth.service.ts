import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  login(email: string, password: string): Observable<ApiResponse<any>> {
    const loginUrl = `${this.URL}/login`;
    return this.http.post<ApiResponse<authModels.LoginResponse>>(loginUrl, { email, password }, this.httpOptions);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

   async isAuthenticated() {
    let authenticated = false;
    const token = this.getToken();

    if (token) {
      try {
        const response: HttpResponse<any> | undefined = await this.http.get(`${this.URL}/isAuthenticated`, {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }),
          observe: 'response' // This tells Angular to return the full HttpResponse
        }).toPromise();

        // Check if 'response' is defined before accessing its properties.
        if (response) {
          if (response.status === 200) {
            authenticated = true;
          } else if (response.status === 401) {
            authenticated = false;
          }
        }
      } catch (error) {
        // Handle any errors that occur during the HTTP request.
        console.error(error);

        // If an error occurs or response is undefined, you might want to set 'authenticated' to false as a fallback.
        authenticated = false;
      }
    }

    return authenticated;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    return this.http.post(`${this.URL}/logout`, {},this.httpOptions);
  }

  forgotPwd(email: string): Observable<ApiResponse<any>> {
    const forgotPwdUrl = `${this.URL}/forgot-password`;
    return this.http.post<ApiResponse<any>>(forgotPwdUrl, { email }, this.httpOptions);
  }
}
