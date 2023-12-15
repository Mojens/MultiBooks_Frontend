import {ContactsResponse} from "../Contacts/contacts.models";
import {BusinessTeamResponse} from "../BusinessTeam/businessTeam.models";

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
  businessTeamCVRNumber: number;
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
  businessTeamCVRNumber: number;
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
  businessTeam: BusinessTeamResponse;
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
  businessTeam: BusinessTeamResponse,
  supplier: ContactsResponse,
  accountingRecords: AccountingRecordResponse[]
}

export interface GetAccountingRecordRequest {
  accountingRecordCashId: number;
  accountingRecordCreditId: number;
}

export interface Pageable {
  sort: {
    empty: boolean,
    unsorted: boolean,
    sorted: boolean
  },
  offset: number,
  pageNumber: number,
  pageSize: number,
  paged: boolean,
  unpaged: boolean
}

export interface PagedResponse<T> {
  content: T[],
  pageable: Pageable,
  last: boolean,
  totalPages: number,
  totalElements: number,
  first: boolean,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    unsorted: boolean,
    sorted: boolean
  },
  numberOfElements: number,
  empty: boolean
}
