import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../../@shared/api.config'
import * as chartsModels from '../../models/Charts/charts.models';
import {ApiResponse} from "../../@shared/api.response";
import {AuthService} from "../../core/auth/auth.service";
import {YearRange} from "../../models/Charts/charts.models";
import {InvoiceResponse} from "../../models/Invoice/invoice.models";

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

    for (let year = currentYear - 5; year <= currentYear; year++) {
      yearOptions.push({ label: year.toString(), value: year.toString() });
    }

    return yearOptions;
  }

  getQuarterDates(quarter: string):YearRange {
    console.log(quarter)
    const currentYear = new Date().getFullYear();
    let startDate, endDate;

    switch (quarter) {
      case "Quarter 1":
        startDate = new Date(currentYear, 0, 1);
        endDate = new Date(currentYear, 2, 31);
        break;
      case "Quarter 2":
        startDate = new Date(currentYear, 3, 1);
        endDate = new Date(currentYear, 5, 30);
        break;
      case "Quarter 3":
        startDate = new Date(currentYear, 6, 1);
        endDate = new Date(currentYear, 8, 30);
        break;
      case "Quarter 4":
        startDate = new Date(currentYear, 9, 1);
        endDate = new Date(currentYear, 11, 31);
        break;
      default:
        console.error("Invalid quarter provided.");
        return { start: new Date(), end: new Date()}
    }
    return { start: startDate, end: endDate}
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

  getVatForQuarter(cvrNumber: number, start: string, end: string): Observable<ApiResponse<chartsModels.AccountingTotalResponse>> {
    const VAT_FOR_QUARTER_URL = this.CHART_URL + `/total-vat/${cvrNumber}?start=${start}&end=${end}`;
    return this.http.get<ApiResponse<chartsModels.AccountingTotalResponse>>(VAT_FOR_QUARTER_URL, this.httpOptions);
  }

  getInvoicesByStatus(cvrNumber: number, statusCode: number,page: number, size: number): Observable<ApiResponse<InvoiceResponse[]>> {
    const INVOICES_BY_STATUS_URL = this.CHART_URL + `/invoice-status/${cvrNumber}/status/${statusCode}?page=${page}&size=${size}`;
    return this.http.get<ApiResponse<InvoiceResponse[]>>(INVOICES_BY_STATUS_URL, this.httpOptions);
  }

}
