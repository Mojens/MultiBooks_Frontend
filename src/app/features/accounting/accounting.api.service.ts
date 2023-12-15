import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../../@shared/api.config'
import * as accountingModels from '../../models/Accounting/Accounting.models';
import {ApiResponse} from "../../@shared/api.response";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root',
})

export class AccountingApiService {
  private token = this.authService.getToken();
  private ACCOUNTING_RECORD = API_URL + 'accounting-record';
  private ACCOUNTING_RECORD_CASH = API_URL + 'accounting-record-cash';
  private ACCOUNTING_RECORD_CREDIT = API_URL + 'accounting-record-credit';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  // ***************************************** AccountingRecord *****************************************

  createAccountingRecord(request: accountingModels.AccountingRecordRequest): Observable<ApiResponse<any>> {
    const createAccountingRecordUrl = `${this.ACCOUNTING_RECORD}/create`;
    return this.http.post<ApiResponse<any>>(createAccountingRecordUrl, request, this.httpOptions);
  }

  updateAccountingRecord(request: accountingModels.AccountingRecordRequest): Observable<ApiResponse<any>> {
    const updateAccountingRecordUrl = `${this.ACCOUNTING_RECORD}/update`;
    return this.http.patch<ApiResponse<any>>(updateAccountingRecordUrl, request, this.httpOptions);
  }

  getAccountingRecord(request: accountingModels.GetAccountingRecordRequest): Observable<ApiResponse<accountingModels.AccountingRecordResponse[]>> {
    const getAccountingRecordUrl = `${this.ACCOUNTING_RECORD}/get`;
    return this.http.post<ApiResponse<any>>(getAccountingRecordUrl, request, this.httpOptions);
  }

  deleteAccountingRecord(accountingRecordId: number): Observable<ApiResponse<any>> {
    const deleteAccountingRecordUrl = `${this.ACCOUNTING_RECORD}/delete/${accountingRecordId}`;
    return this.http.delete<ApiResponse<any>>(deleteAccountingRecordUrl, this.httpOptions);
  }

  // ***************************************** AccountingRecordCash *****************************************

  createAccountingRecordCash(request: accountingModels.AccountingRecordCashRequest): Observable<ApiResponse<any>> {
    const createAccountingRecordCashUrl = `${this.ACCOUNTING_RECORD_CASH}/create`;
    return this.http.post<ApiResponse<any>>(createAccountingRecordCashUrl, request, this.httpOptions);
  }

  getAccountingRecordCash(cvrNumber: number): Observable<ApiResponse<accountingModels.PagedResponse<accountingModels.AccountingRecordCashResponse>>> {
    const getAccountingRecordCashUrl = `${this.ACCOUNTING_RECORD_CASH}/all/${cvrNumber}`;
    return this.http.get<ApiResponse<any>>(getAccountingRecordCashUrl, this.httpOptions);
  }

  updateAccountingRecordCash(request: accountingModels.AccountingRecordCashRequest): Observable<ApiResponse<any>> {
    const updateAccountingRecordCashUrl = `${this.ACCOUNTING_RECORD_CASH}/update`;
    return this.http.patch<ApiResponse<any>>(updateAccountingRecordCashUrl, request, this.httpOptions);
  }

  getAccountingRecordCashById(accountingRecordCashId: number): Observable<ApiResponse<accountingModels.AccountingRecordCashResponse>> {
    const getAccountingRecordCashByIdUrl = `${this.ACCOUNTING_RECORD_CASH}/get/${accountingRecordCashId}`;
    return this.http.get<ApiResponse<any>>(getAccountingRecordCashByIdUrl, this.httpOptions);
  }

  deleteAccountingRecordCash(accountingRecordCashId: number): Observable<ApiResponse<accountingModels.AccountingRecordCashResponse>> {
    const deleteAccountingRecordCashUrl = `${this.ACCOUNTING_RECORD_CASH}/delete/${accountingRecordCashId}`;
    return this.http.delete<ApiResponse<any>>(deleteAccountingRecordCashUrl, this.httpOptions);
  }

  // ***************************************** AccountingRecordCredit *****************************************

  getAccountingRecordCredit(cvrNumber: number): Observable<ApiResponse<accountingModels.PagedResponse<accountingModels.AccountingRecordCreditResponse>>> {
    const getAccountingRecordCreditUrl = `${this.ACCOUNTING_RECORD_CREDIT}/all/${cvrNumber}`;
    return this.http.get<ApiResponse<any>>(getAccountingRecordCreditUrl, this.httpOptions);
  }

  getAccountingRecordCreditById(accountingRecordCreditId: number): Observable<ApiResponse<accountingModels.AccountingRecordCreditResponse>> {
    const getAccountingRecordCreditByIdUrl = `${this.ACCOUNTING_RECORD_CREDIT}/get/${accountingRecordCreditId}`;
    return this.http.get<ApiResponse<any>>(getAccountingRecordCreditByIdUrl, this.httpOptions);
  }

  createAccountingRecordCredit(request: accountingModels.AccountingRecordCreditRequest): Observable<ApiResponse<any>> {
    const createAccountingRecordCreditUrl = `${this.ACCOUNTING_RECORD_CREDIT}/create`;
    return this.http.post<ApiResponse<any>>(createAccountingRecordCreditUrl, request, this.httpOptions);
  }

  updateAccountingRecordCredit(request: accountingModels.AccountingRecordCreditRequest): Observable<ApiResponse<any>> {
    const updateAccountingRecordCreditUrl = `${this.ACCOUNTING_RECORD_CREDIT}/update`;
    return this.http.patch<ApiResponse<any>>(updateAccountingRecordCreditUrl, request, this.httpOptions);
  }

  deleteAccountingRecordCredit(accountingRecordCreditId: number): Observable<ApiResponse<any>> {
    const deleteAccountingRecordCreditUrl = `${this.ACCOUNTING_RECORD_CREDIT}/delete/${accountingRecordCreditId}`;
    return this.http.delete<ApiResponse<any>>(deleteAccountingRecordCreditUrl, this.httpOptions);
  }

}
