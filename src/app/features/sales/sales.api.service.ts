import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../../@shared/api.config'
import * as invoiceModels from '../../models/Invoice/invoice.models';
import * as productToSaleModels from '../../models/ProductToSale/productToSale.models';
import {ApiResponse} from "../../@shared/api.response";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root',
})

export class SalesApiService {
  private token = this.authService.getToken();
  private INVOICE_URL = API_URL + 'invoice'
  private PRODUCT_TO_SALE_URL = API_URL + 'product-to-sale'

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  // *********************************************************** Invoice *********************************************************** //
  getInvoices(CVRNumber: number, page: number, size: number): Observable<ApiResponse<invoiceModels.PagedResponse<invoiceModels.InvoiceResponse>>> {
    const getInvoicesUrl = `${this.INVOICE_URL}/all/${CVRNumber}?page=${page}&size=${size}`;
    return this.http.get<ApiResponse<invoiceModels.PagedResponse<invoiceModels.InvoiceResponse>>>(getInvoicesUrl, this.httpOptions);
  }

  getInvoice(invoiceNumber: number): Observable<ApiResponse<invoiceModels.InvoiceResponse>> {
    const getInvoiceUrl = `${this.INVOICE_URL}/get/${invoiceNumber}`;
    return this.http.get<ApiResponse<invoiceModels.InvoiceResponse>>(getInvoiceUrl, this.httpOptions);
  }

  createInvoice(CVRNumber: number): Observable<ApiResponse<invoiceModels.InvoiceResponse>> {
    const createInvoiceUrl = `${this.INVOICE_URL}/create/${CVRNumber}`;
    return this.http.post<ApiResponse<any>>(createInvoiceUrl, {}, this.httpOptions);
  }

  fillInvoice(request: invoiceModels.InvoiceFillRequest): Observable<ApiResponse<invoiceModels.InvoiceResponse>> {
    const fillInvoiceUrl = `${this.INVOICE_URL}/fill`;
    return this.http.post<ApiResponse<any>>(fillInvoiceUrl, request, this.httpOptions);
  }

  editInvoice(request: invoiceModels.InvoiceFillRequest): Observable<ApiResponse<invoiceModels.InvoiceResponse>> {
    const editInvoiceUrl = `${this.INVOICE_URL}/edit`;
    return this.http.patch<ApiResponse<any>>(editInvoiceUrl, request, this.httpOptions);
  }

  changeInvoiceStatus(invoiceNumber: number, statusCode: number): Observable<ApiResponse<invoiceModels.InvoiceResponse>> {
    const changeInvoiceStatusUrl = `${this.INVOICE_URL}/status/${invoiceNumber}/${statusCode}`;
    return this.http.patch<ApiResponse<any>>(changeInvoiceStatusUrl, {}, this.httpOptions);
  }

  deleteInvoice(invoiceNumber: number): Observable<ApiResponse<invoiceModels.InvoiceResponse>> {
    const deleteInvoiceUrl = `${this.INVOICE_URL}/delete/${invoiceNumber}`;
    return this.http.delete<ApiResponse<any>>(deleteInvoiceUrl, this.httpOptions);
  }

  // *********************************************************** Product to sale *********************************************************** //

  getProductsOnInvoice(invoiceNumber: number): Observable<ApiResponse<productToSaleModels.ProductToSaleResponse[]>> {
    const getProductsOnInvoiceUrl = `${this.PRODUCT_TO_SALE_URL}/invoice/${invoiceNumber}`;
    return this.http.get<ApiResponse<productToSaleModels.ProductToSaleResponse[]>>(getProductsOnInvoiceUrl, this.httpOptions);
  }

  addProductToInvoice(invoiceNumber: number, request: productToSaleModels.ProductToSaleRequest): Observable<ApiResponse<productToSaleModels.ProductToSaleResponse>> {
    const addProductToInvoiceUrl = `${this.PRODUCT_TO_SALE_URL}/add/${invoiceNumber}`;
    return this.http.post<ApiResponse<any>>(addProductToInvoiceUrl, request, this.httpOptions);
  }

  editProductOnInvoice(invoiceNumber: number, request: productToSaleModels.ProductToSaleRequest): Observable<ApiResponse<productToSaleModels.ProductToSaleResponse>> {
    const editProductOnInvoiceUrl = `${this.PRODUCT_TO_SALE_URL}/edit/${invoiceNumber}`;
    return this.http.patch<ApiResponse<any>>(editProductOnInvoiceUrl, request, this.httpOptions);
  }

  deleteAllProductsOnInvoice(invoiceNumber: number): Observable<ApiResponse<any>> {
    const deleteAllProductsOnInvoiceUrl = `${this.PRODUCT_TO_SALE_URL}/delete/all/${invoiceNumber}`;
    return this.http.delete<ApiResponse<any>>(deleteAllProductsOnInvoiceUrl, this.httpOptions);
  }

  deleteProductOnInvoice(invoiceNumber: number, productNumber: number): Observable<ApiResponse<productToSaleModels.ProductToSaleResponse>> {
    const deleteProductOnInvoiceUrl = `${this.PRODUCT_TO_SALE_URL}/delete/${productNumber}/invoice/${invoiceNumber}`;
    return this.http.delete<ApiResponse<productToSaleModels.ProductToSaleResponse>>(deleteProductOnInvoiceUrl, this.httpOptions);
  }

}
