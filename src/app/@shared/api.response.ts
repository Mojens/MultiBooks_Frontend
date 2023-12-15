import { ContactsResponse, PagedResponse } from "../models";
import { ProductResponse } from "../models/Product/product.models";
import {AccountingRecordCashResponse} from "../models/Accounting/Accounting.models";

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ContactsPagedApiResponse extends ApiResponse<PagedResponse<ContactsResponse>> {}
export interface ProductPagedApiResponse extends ApiResponse<PagedResponse<ProductResponse>> {}
export interface AccountingRecordCashPagedApiResponse extends ApiResponse<PagedResponse<AccountingRecordCashResponse>> {}
export interface AccountingRecordCreditPagedApiResponse extends ApiResponse<PagedResponse<AccountingRecordCashResponse>> {}
