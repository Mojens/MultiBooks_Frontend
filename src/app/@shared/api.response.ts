import { ContactsResponse, PagedResponse } from "../models";
import { ProductResponse } from "../models/Product/product.models";

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ContactsPagedApiResponse extends ApiResponse<PagedResponse<ContactsResponse>> {}
export interface ProductPagedApiResponse extends ApiResponse<PagedResponse<ProductResponse>> {}
