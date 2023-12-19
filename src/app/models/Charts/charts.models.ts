export interface TotalUsersResponse {
  totalUsers: number;
}

export interface TotalProductsResponse {
  totalProducts: number;
}

export interface InvoiceStatusResponse {
  totalInvoices: number;
  status: string;
}

export interface YearRange {
  start: Date;
  end: Date;
}

export interface InvoiceSalesResponse {
  totalInvoices: number;
  quarter: string;
  total: number;
}

export interface TotalInvoicesResponse {
  totalInvoices: number;
}

export interface AccountingTotalResponse {
  quarter: string;
  total: number;
}
