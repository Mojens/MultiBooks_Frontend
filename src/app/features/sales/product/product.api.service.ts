import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../@shared/api.config'
import * as productModels from '../../../models/Product/product.models';
import {ApiResponse} from "../../../@shared/api.response";
import {AuthService} from "../../../core/auth/auth.service";

@Injectable({
  providedIn: 'root',
})

export class ProductApiService {
  private token = this.authService.getToken();
  private URL = API_URL + 'product'

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  getProduct(id: number): Observable<ApiResponse<productModels.ProductResponse>> {
    const getProductUrl = `${this.URL}/get/${id}`;
    return this.http.get<ApiResponse<productModels.ProductResponse>>(getProductUrl, this.httpOptions);
  }

  getProducts(CVRNumber: number, page: number, size: number): Observable<ApiResponse<productModels.PagedResponse<productModels.ProductResponse>>> {
    const getProductsUrl = `${this.URL}/all/${CVRNumber}?page=${page}&size=${size}`;
    return this.http.get<ApiResponse<productModels.PagedResponse<productModels.ProductResponse>>>(getProductsUrl, this.httpOptions);
  }

  createProduct(request: productModels.ProductRequest): Observable<ApiResponse<any>>{
    const createProductUrl = `${this.URL}/create`;
    return this.http.post<ApiResponse<any>>(createProductUrl, request, this.httpOptions);
  }

  updateProduct(request: productModels.UpdateProductRequest): Observable<ApiResponse<any>>{
    const updateProductUrl = `${this.URL}/update`;
    return this.http.patch<ApiResponse<any>>(updateProductUrl, request, this.httpOptions);
  }

  deleteProduct(productId: number): Observable<ApiResponse<any>>{
    const deleteProductUrl = `${this.URL}/delete/${productId}`;
    return this.http.delete<ApiResponse<any>>(deleteProductUrl, this.httpOptions);
  }


}
