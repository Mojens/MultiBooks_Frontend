import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {ContactsApiService} from "./contacts.api.service";
import {DividerModule} from "primeng/divider";
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TooltipModule, DividerModule, FontAwesomeModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {

  faAddressBook = faAddressBook;

  constructor(private contactService: ContactsApiService) {
  }

  ngOnInit(): void {
  }

}
