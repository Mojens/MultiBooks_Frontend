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
  start: string;
  end: string;
}

export interface InvoiceSalesResponse {
  totalInvoices: number;
  quarter: string;
  total: number;
}

export interface TotalInvoicesResponse {
  totalInvoices: number;
}
