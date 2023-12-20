import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../../@shared/api.config'
import * as invoiceModels from '../../models/Invoice/invoice.models';
import * as productToSaleModels from '../../models/ProductToSale/productToSale.models';
import {ApiResponse} from "../../@shared/api.response";
import {AuthService} from "../../core/auth/auth.service";
import {UpdateUserRequest, UserResponse} from "../../models";

@Injectable({
  providedIn: 'root',
})

export class SettingsApiService {
  private token = this.authService.getToken();
  private USERS_URL = API_URL + 'users'
  private TEAM_URL = API_URL + 'business-team'

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  updateUser(request: UpdateUserRequest): Observable<ApiResponse<UserResponse>> {
    const updateUserUrl = `${this.USERS_URL}/update`;
    return this.http.patch<ApiResponse<UserResponse>>(updateUserUrl, request, this.httpOptions);
  }

  isTeamOwner(cvrNumber:Number): Observable<ApiResponse<boolean>> {
    const isTeamOwnerUrl = `${this.TEAM_URL}/is-team-owner/${cvrNumber}`;
    return this.http.get<ApiResponse<boolean>>(isTeamOwnerUrl, this.httpOptions);
  }

}
