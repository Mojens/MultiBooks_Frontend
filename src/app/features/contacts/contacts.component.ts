import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {ContactsApiService} from "./contacts.api.service";
import {DividerModule} from "primeng/divider";
import {faAddressBook} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ContactsRequest, ContactsResponse, UpdateContactsRequest} from "../../models";
import {TeamManagementApiService} from "../team-management/team-management.api.service";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {ToastrService} from "ngx-toastr";
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import DOMPurify from 'dompurify';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-contacts',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, TooltipModule, DividerModule, FontAwesomeModule, TableModule, ButtonModule, RippleModule, DropdownModule, ConfirmDialogModule, InputTextModule],
  providers: [ConfirmationService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class ContactsComponent implements OnInit {

  faAddressBook = faAddressBook;
  paymentMethods: any[] = [];
  contacts: ContactsResponse[] = [];
  currentBusinessTeamCVRNumber: number = 0;

  totalRecords: number = 0;
  rows: number = 5;
  currentPage: number = 0;

  formData: ContactsRequest = {
    attentionPerson: '',
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyZipCode: 0,
    companyCountry: '',
    CVRNumber: 0,
    email: '',
    paymentTermsDays: 0,
    paymentTermsMethod: '',
    phoneNumber: '',
    eInvoiceRecipientType: 'CVR',
    website: '',
    businessTeamCVRNumber: 0,
  }
  editFormData: UpdateContactsRequest = {
    attentionPerson: '',
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyZipCode: 0,
    companyCountry: '',
    CVRNumber: 0,
    email: '',
    id: 0,
    paymentTermsDays: 0,
    paymentTermsMethod: '',
    eInvoiceRecipientType: '',
    phoneNumber: '',
    website: '',
    businessTeamCVRNumber: 0,
  }

  createMode: boolean = false;
  editMode: boolean = false;

  constructor(  private contactService: ContactsApiService,
                private teamService: TeamManagementApiService,
                private toast: ToastrService,
                private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.getContacts(this.currentPage, this.rows);
    this.paymentMethods = [
      { label: 'The invoice is paid', value:'The invoice is paid' },
      { label:'Current month',value: 'Current month' },
      { label:'Netto (Net)',value: 'Netto (Net)' },
      { label:'Netto cash (Net cash)',value: 'Netto cash (Net cash)' }
    ]
  }

  getContacts(page: number, size: number) {
    this.contactService.getContacts(this.currentBusinessTeamCVRNumber, page, size).subscribe((response) => {
      this.contacts = response.data.content;
      this.totalRecords = response.data.totalElements;
    });
  }

  formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/(\+45)(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
  }


  onLazyLoad(event: any): void {
    this.currentPage = event.first / event.rows;
    this.getContacts(this.currentPage, event.rows);
  }

  setCreateMode() {
    this.createMode = !this.createMode;
  }

  createContact(){
    const request: ContactsRequest = {
      ...this.formData,
      businessTeamCVRNumber: this.currentBusinessTeamCVRNumber
    }
    this.contactService.createContact(request).subscribe(
      (response) => {
        this.contacts.push(response.data);
        this.toast.success('Successfully created business team');
        this.setCreateMode();
        this.getContacts(this.currentPage, this.rows);
      });
  }

  deleteContact(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this contact?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
      rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      accept: () => {
        this.contactService.deleteContact(id).subscribe(
          (response) => {
            this.contacts = this.contacts.filter((contact) => contact.id !== id);
            this.totalRecords -= 1;
            if (this.contacts.length === 0 && this.currentPage > 0) {
              this.currentPage -= 1;
            }
            this.getContacts(this.currentPage, this.rows);
            this.toast.success('Successfully deleted contact');
          });
      },
      reject: () => {
        return;
        }
      });
  }

  seeDetails(contact: ContactsResponse) {
    const formattedPhoneNumber = this.formatPhoneNumber(contact.phoneNumber);
    const rawContactDetails = `
    <div>
      <p><b>Company Name:</b> ${contact.companyName}</p>
      <p><b>Company Address:</b> ${contact.companyAddress}</p>
      <p><b>Company City:</b> ${contact.companyCity}</p>
      <p><b>Company Zip Code:</b> ${contact.companyZipCode}</p>
      <p><b>Company Country:</b> ${contact.companyCountry}</p>
      <p><b>Attention Person:</b> ${contact.attentionPerson}</p>
      <p><b>E Invoice Recipient Type:</b> ${contact.einvoiceRecipientType}</p>
      <p><b>CVR Number:</b> ${contact.cvrnumber}</p>
      <p><b>Email:</b> ${contact.email}</p>
      <p><b>Payment Terms Days:</b> ${contact.paymentTermsDays}</p>
      <p><b>Payment Terms Method:</b> ${contact.paymentTermsMethod}</p>
      <p><b>Phone Number:</b> <a class="hover:text-blue-600" href="tel:${contact.phoneNumber}">${formattedPhoneNumber}</a></p>
      <p><b>Website:</b> ${contact.website}</p>
    </div>
  `;

    const contactDetails = DOMPurify.sanitize(rawContactDetails);
    this.confirmationService.confirm({
      message: contactDetails,
      header: 'Contact Details',
      icon: 'pi pi-info-circle',
      acceptVisible: false,
      rejectLabel: 'Close',
      rejectButtonStyleClass: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    });
  }

  onUpdateContact() {
    const request: UpdateContactsRequest = {
      ...this.editFormData,
      businessTeamCVRNumber: this.currentBusinessTeamCVRNumber
    }
    this.contactService.updateContact(request).subscribe(
      (response) => {
        this.contacts = this.contacts.map((contact) => {
          if (contact.id === response.data.id) {
            return response.data;
          }
          return contact;
        });
        this.toast.success('Successfully updated contact');
        this.exitEditMode();
      });

  }
  setEditMode(contact: ContactsResponse) {
    this.editMode = !this.editMode;
    this.editFormData = {
      attentionPerson: contact.attentionPerson,
      companyName: contact.companyName,
      CVRNumber: contact.cvrnumber,
      email: contact.email,
      id: contact.id,
      paymentTermsDays: contact.paymentTermsDays,
      paymentTermsMethod: contact.paymentTermsMethod,
      eInvoiceRecipientType: contact.einvoiceRecipientType,
      phoneNumber: contact.phoneNumber,
      website: contact.website,
      companyAddress: contact.companyAddress,
      companyCity: contact.companyCity,
      companyCountry: contact.companyCountry,
      companyZipCode: contact.companyZipCode,
      businessTeamCVRNumber: this.currentBusinessTeamCVRNumber,
    }
  }
  exitEditMode() {
    this.editMode = false;
  }


}
