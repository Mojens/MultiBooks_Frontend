import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../@shared/api.config'
import * as contactsModels from '../../models/Contacts/contacts.models';
import {ApiResponse} from "../../@shared/api.response";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root',
})

export class ContactsApiService {
  private token = this.authService.getToken();
  private URL = API_URL + 'contacts'

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  getContacts(CVRNumber: number, page: number, size: number): Observable<ApiResponse<contactsModels.PagedResponse<contactsModels.ContactsResponse>>> {
    const getContactsUrl = `${this.URL}/all/${CVRNumber}?page=${page}&size=${size}`;
    return this.http.get<ApiResponse<contactsModels.PagedResponse<contactsModels.ContactsResponse>>>(getContactsUrl, this.httpOptions);
  }


  createContact(request: contactsModels.ContactsRequest): Observable<ApiResponse<any>>{
    const createContactUrl = `${this.URL}/create`;
    return this.http.post<ApiResponse<any>>(createContactUrl, request, this.httpOptions);
  }

  updateContact(request: contactsModels.UpdateContactsRequest): Observable<ApiResponse<any>>{
    const updateContactUrl = `${this.URL}/update`;
    return this.http.patch<ApiResponse<any>>(updateContactUrl, request, this.httpOptions);
  }

  deleteContact(contactId: number): Observable<ApiResponse<any>>{
    const deleteContactUrl = `${this.URL}/delete/${contactId}`;
    return this.http.delete<ApiResponse<any>>(deleteContactUrl, this.httpOptions);
  }



}
