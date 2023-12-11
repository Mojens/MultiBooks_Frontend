import {ProductToSaleResponse} from "../ProductToSale/productToSale.models";
import {ContactsResponse} from "../Contacts/contacts.models";

export interface InvoiceFillRequest {
  invoiceNumber: number,
  invoiceComment: string,
  invoiceTitle: string,
  invoiceDate: string,
  subTotal: number,
  total: number,
  statusCode: number,
  EditedBy: string,
  contactId: number
}

export interface InvoiceResponse {
  invoiceNumber: number,
  invoiceComment: string,
  invoiceTitle: string,
  invoiceDate: Date,
  subTotal: number,
  subTotalWithVat: number,
  total: number,
  status: string,
  contact: ContactsResponse,
  productToSale: ProductToSaleResponse[]
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
