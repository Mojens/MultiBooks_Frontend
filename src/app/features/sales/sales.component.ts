import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {SalesApiService} from "./sales.api.service";
import {TeamManagementApiService} from "../team-management/team-management.api.service";
import {InvoiceResponse} from "../../models/Invoice/invoice.models";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { Table } from 'primeng/table';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule,
    FontAwesomeModule,
    ButtonModule,
    RippleModule,
    SharedModule,
    TableModule,
    TooltipModule,
    FormsModule,
    InputTextModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  faDollarSign = faDollarSign;
  currentBusinessTeamCVRNumber: number = 0;
  invoices: InvoiceResponse[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  currentPage: number = 0;
  inputSearch: string = '';

  constructor(private route: Router,
              private salesService: SalesApiService,
              private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.getInvoices(this.currentPage, this.rows);
  }

  navigateToSales() {
    this.salesService.createInvoice(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.route.navigate(['sales/create/', Number(response.data.invoiceNumber)]);
    });
  }

  navigateToProducts() {
    this.route.navigate(['sales/product']);
  }

  getInvoices(currentPage: number, rows: number) {
    this.salesService.getInvoices(this.currentBusinessTeamCVRNumber, currentPage, rows).subscribe((response: any) => {
      this.invoices = response.data.content;
      this.totalRecords = response.data.totalElements;
    });
  }

}
