import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../@shared/api.config'
import * as teamModels from '../../models/BusinessTeam/businessTeam.models';
import {ApiResponse} from "../../@shared/api.response";

@Injectable({
  providedIn: 'root',
})

export class TeamManagementApiService {
  private tokenKey = "token_key"
  private URL = API_URL + 'business-team'

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createBusinessTeam(request: teamModels.BusinessTeamRequest): Observable<ApiResponse<any>>{
    const createBusinessTeamUrl = `${this.URL}/create`;
    return this.http.post<ApiResponse<any>>(createBusinessTeamUrl, request, this.httpOptions);
  }

  setUserBusinessTeam(mail: string, CVRNumber: number): Observable<ApiResponse<any>>{
    return this.http.patch<ApiResponse<any>>(this.URL+`/${mail}/${CVRNumber}`, this.httpOptions);
  }


}
