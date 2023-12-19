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

  getYearOptions() {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];

    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
      yearOptions.push({ label: year.toString(), value: year.toString() });
    }

    return yearOptions;
  }

  getSalesYearly(cvrNumber: number, start: string, end: string): Observable<ApiResponse<chartsModels.InvoiceSalesResponse[]>> {
    const SALES_YEARLY_URL = this.CHART_URL + `/sales/${cvrNumber}?start=${start}&end=${end}`;
    return this.http.get<ApiResponse<chartsModels.InvoiceSalesResponse[]>>(SALES_YEARLY_URL, this.httpOptions);
  }

  getInvoiceStatusCircleChart(cvrNumber: number, start: string, end: string): Observable<ApiResponse<chartsModels.InvoiceStatusResponse[]>> {
    const INVOICE_STATUS_URL = this.CHART_URL + `/invoice-status/${cvrNumber}?start=${start}&end=${end}`;
    return this.http.get<ApiResponse<chartsModels.InvoiceStatusResponse[]>>(INVOICE_STATUS_URL, this.httpOptions);
  }

  getTotalProducts(cvrNumber: number): Observable<ApiResponse<chartsModels.TotalProductsResponse>> {
    const TOTAL_PRODUCTS_URL = this.CHART_URL + `/total-products/${cvrNumber}`;
    return this.http.get<ApiResponse<chartsModels.TotalProductsResponse>>(TOTAL_PRODUCTS_URL, this.httpOptions);
  }

  getTotalUsers(cvrNumber: number): Observable<ApiResponse<chartsModels.TotalUsersResponse>> {
    const TOTAL_USERS_URL = this.CHART_URL + `/total-users/${cvrNumber}`;
    return this.http.get<ApiResponse<chartsModels.TotalUsersResponse>>(TOTAL_USERS_URL, this.httpOptions);
  }

  getTotalInvoices(cvrNumber: number): Observable<ApiResponse<chartsModels.TotalInvoicesResponse>> {
    const TOTAL_INVOICES_URL = this.CHART_URL + `/total-invoices/${cvrNumber}`;
    return this.http.get<ApiResponse<chartsModels.TotalInvoicesResponse>>(TOTAL_INVOICES_URL, this.httpOptions);
  }

}
