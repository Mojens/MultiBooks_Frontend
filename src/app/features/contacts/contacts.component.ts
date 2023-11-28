import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {ContactsApiService} from "./contacts.api.service";
import {DividerModule} from "primeng/divider";
import {faAddressBook} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ContactsResponse} from "../../models";
import {TeamManagementApiService} from "../team-management/team-management.api.service";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TooltipModule, DividerModule, FontAwesomeModule, TableModule, ButtonModule, RippleModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {

  faAddressBook = faAddressBook;
  contacts: ContactsResponse[] = [];
  currentBusinessTeamCVRNumber: number = 0;

  totalRecords: number = 0;
  rows: number = 5;
  currentPage: number = 0;

  constructor(private contactService: ContactsApiService, private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.getContacts(this.currentPage, this.rows);
  }

  getContacts(page: number, size: number) {
    this.contactService.getContacts(this.currentBusinessTeamCVRNumber, page, size).subscribe((response) => {
      console.log(response.data);
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

}
