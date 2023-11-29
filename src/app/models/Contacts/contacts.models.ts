export interface ContactsResponse {
  attentionPerson: string,
  einvoiceRecipientType: string,
  companyName: string,
  cvrnumber: number,
  email: string,
  id: number,
  paymentTermsDays: number,
  paymentTermsMethod: string,
  phoneNumber: string,
  website: string,
}

export interface ContactsRequest {
  attentionPerson: string,
  companyName: string,
  CVRNumber: number,
  email: string,
  paymentTermsDays: number,
  paymentTermsMethod: string,
  phoneNumber: string,
  website: string,
  businessTeamCVRNumber: number,
  eInvoiceRecipientType: string
}

export interface UpdateContactsRequest{
  attentionPerson: string,
  companyName: string,
  CVRNumber: number,
  email: string,
  id: number,
  paymentTermsDays: number,
  paymentTermsMethod: string,
  eInvoiceRecipientType: string,
  phoneNumber: string,
  website: string,
  businessTeamCVRNumber: number,
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
