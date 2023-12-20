import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../@shared/api.config'
import * as teamModels from '../../models/BusinessTeam/businessTeam.models';
import {ApiResponse} from "../../@shared/api.response";
import {AuthService} from "../../core/auth/auth.service";
import {BusinessTeamResponse} from "../../models/BusinessTeam/businessTeam.models";

@Injectable({
  providedIn: 'root',
})

export class TeamManagementApiService {
  private token = this.authService.getToken();
  private URL = API_URL + 'business-team'

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  getCurrentBusinessTeam(): BusinessTeamResponse {
    return JSON.parse(localStorage.getItem('current_business_team') || '{}');
  }

  createBusinessTeam(request: teamModels.BusinessTeamRequest): Observable<ApiResponse<any>>{
    const createBusinessTeamUrl = `${this.URL}/create`;
    return this.http.post<ApiResponse<any>>(createBusinessTeamUrl, request, this.httpOptions);
  }

  setUserBusinessTeam(mail: string, CVRNumber: number): Observable<ApiResponse<any>>{
    return this.http.patch<ApiResponse<any>>(this.URL+`/${mail}/${CVRNumber}`, this.httpOptions);
  }

  getUserBusinessTeam(mail: string): Observable<ApiResponse<any>>{
    const getUserBusinessTeamUrl = `${this.URL}/user/${mail}`;
    return this.http.get<ApiResponse<any>>(getUserBusinessTeamUrl, this.httpOptions);
  }

  getBusinessTeam(CVRNumber: number): Observable<ApiResponse<any>>{
    const getBusinessTeamUrl = `${this.URL}/get/${CVRNumber}`;
    return this.http.get<ApiResponse<any>>(getBusinessTeamUrl, this.httpOptions);
  }

  editBusinessTeam(request: teamModels.BusinessTeamRequest): Observable<ApiResponse<teamModels.BusinessTeamResponse>>{
    const editBusinessTeamUrl = `${this.URL}/edit`;
    return this.http.patch<ApiResponse<teamModels.BusinessTeamResponse>>(editBusinessTeamUrl, request, this.httpOptions);
  }



}
