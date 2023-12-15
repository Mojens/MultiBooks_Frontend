import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../@shared/api.config'
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

  // ***************************************** AccountingRecordCash *****************************************

  // ***************************************** AccountingRecordCredit *****************************************





}
