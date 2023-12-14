import {ContactsResponse} from "../Contacts/contacts.models";

export interface AccountingRecordRequest {
  id: number;
  priceInclVat: number;
  vat: number;
  description: string;
  account: string;
  accountingRecordCashId: number;
  accountingRecordCreditId: number;
}

export interface AccountingRecordCashRequest {
  id: number;
  documentDate: Date;
  holdings: string;
  boughtFrom: string;
  subTotalVat: number;
  subTotalNoVat: number;
  total: number;
}

export interface AccountingRecordCreditRequest {
  id: number;
  documentDate: Date;
  dueDate: Date;
  valuta: string;
  supplierId: number;
  boughtFrom: string;
  subTotalVat: number;
  subTotalNoVat: number;
  total: number;
}

export interface AccountingRecordResponse {
  id: number;
  priceInclVat: number;
  vat: number;
  description: string;
  account: string;
}

export interface AccountingRecordCashResponse {
  id: number;
  documentDate: Date;
  holdings: string;
  boughtFrom: string;
  subTotalVat: number;
  subTotalNoVat: number;
  total: number;
  accountingRecords: AccountingRecordResponse[];
}

export interface AccountingRecordCreditResponse {
  id: number,
  documentDate: Date,
  dueDate: Date,
  valuta: string,
  boughtFrom: string,
  subTotalVat: number,
  subTotalNoVat: number,
  total: number,
  supplier: ContactsResponse,
  accountingRecords: AccountingRecordResponse[]
}
