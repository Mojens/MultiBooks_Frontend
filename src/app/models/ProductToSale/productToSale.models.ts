import {ProductResponse} from "../Product/product.models";

export interface ProductToSaleRequest {
  productToSaleId: number,
  productUnit: string,
  productAmount: number,
  productDiscount: number,
  productPriceExclVAT: number,
  productPriceAfterDiscount: number,
  invoiceNumber: number,
}

export interface ProductToSaleResponse {
  id: number,
  productUnit: string,
  productAmount: number,
  productDiscount: number,
  productPriceExclVAT: number,
  productPriceAfterDiscount: number,
  product: ProductResponse
}
