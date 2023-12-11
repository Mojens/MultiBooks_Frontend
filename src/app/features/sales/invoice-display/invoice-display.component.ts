import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BusinessTeamResponse} from "../../../models";
import {SalesApiService} from "../sales.api.service";
import {ActivatedRoute} from "@angular/router";
import {InvoiceResponse} from "../../../models/Invoice/invoice.models";
import {MenuItem} from "primeng/api";
import {MenuModule} from "primeng/menu";
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-invoice-display',
  standalone: true,
  imports: [CommonModule, MenuModule],
  providers: [DatePipe],
  templateUrl: './invoice-display.component.html',
  styleUrl: './invoice-display.component.css'
})
export class InvoiceDisplayComponent implements OnInit {

  currentBusinessObject: BusinessTeamResponse = {} as BusinessTeamResponse;
  invoice: InvoiceResponse = {} as InvoiceResponse;
  invoiceNumber: number = 0;
  items: MenuItem[] | undefined;

  constructor(private salesService: SalesApiService,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.currentBusinessObject = this.getBusinessTeam();
    this.invoiceNumber = Number(this.route.snapshot.paramMap.get('invoiceId'));
    this.getInvoice(this.invoiceNumber);
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash'
      }
    ];
  }

  getBusinessTeam() {
    let businessJson = localStorage.getItem('current_business_team');
    if (businessJson) {
      this.currentBusinessObject = JSON.parse(businessJson);
    }
    return this.currentBusinessObject;
  }

  getInvoice(invoiceNumber: number) {
    this.salesService.getInvoice(invoiceNumber).subscribe((response: any) => {
      this.invoice = response.data;
    });
  }

  generatePDF() {}

  openPDF() {}

}
