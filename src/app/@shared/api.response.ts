import { ContactsResponse, PagedResponse } from "../models";

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ContactsPagedApiResponse extends ApiResponse<PagedResponse<ContactsResponse>> {}
