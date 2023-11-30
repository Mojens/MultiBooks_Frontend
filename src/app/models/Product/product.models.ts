export interface ProductRequest {
  productName: string,
  productCode: number,
  productAmount: number,
  productUnit: string,
  productPriceExclVAT: number,
  productPriceInclVAT: number,
  productDescription: string,
  productAccount: number,
  businessCVRNumber: number
}

export interface ProductResponse {
  id: number,
  productName: string,
  productCode: number,
  productAmount: number,
  productUnit: string,
  productPriceExclVAT: number,
  productPriceInclVAT: number,
  productDescription: string,
  productAccount: number,
}

export interface UpdateProductRequest {
  id: number,
  productName: string,
  productCode: number,
  productAmount: number,
  productUnit: string,
  productPriceExclVAT: number,
  productPriceInclVAT: number,
  productDescription: string,
  productAccount: number,
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
