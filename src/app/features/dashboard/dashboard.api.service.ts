import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../../@shared/api.config'
import * as chartsModels from '../../models/Charts/charts.models';
import {ApiResponse} from "../../@shared/api.response";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root',
})

export class DashboardApiService {
  private token = this.authService.getToken();
  private CHART_URL = API_URL + 'chart'

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  getYearOptions(){
    const currentYear = new Date().getFullYear();
    const yearOptions = [];

    for (let year = currentYear; year <= currentYear + 5; year++) {
      yearOptions.push({ label: year.toString(), value: year.toString() });
    }

    return yearOptions;
  }


  getSalesYearly(cvrNumber: number, start:string, end:string): Observable<ApiResponse<chartsModels.InvoiceSalesResponse[]>> {
    const SALES_YEARLY_URL = this.CHART_URL + `/sales/${cvrNumber}?start=${start}&end=${end}`;
    return this.http.get<ApiResponse<chartsModels.InvoiceSalesResponse[]>>(SALES_YEARLY_URL, this.httpOptions);
  }

}
