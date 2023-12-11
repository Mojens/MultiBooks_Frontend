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
import {ConfirmationService, SortEvent} from "primeng/api";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BreadcrumbModule} from "primeng/breadcrumb";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule, InputTextModule],
  providers: [ConfirmationService],
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

  constructor(private route: Router,
              private salesService: SalesApiService,
              private teamService: TeamManagementApiService,
              private toast: ToastrService,
              private confirmationService: ConfirmationService) {
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

  deleteInvoice(invoiceNumber: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Invoice?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
      rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      accept: () => {
        this.salesService.deleteInvoice(invoiceNumber).subscribe(
          (response) => {
            this.invoices = this.invoices.filter((invoice) => invoice.invoiceNumber !== invoiceNumber);
            this.totalRecords -= 1;
            if (this.invoices.length === 0 && this.currentPage > 0) {
              this.currentPage -= 1;
            }
            this.getInvoices(this.currentPage, this.rows);
            this.toast.success('Successfully deleted invoice');
          },
          (error) => {
            this.toast.error('Failed to delete invoice. Please try again later.');
          }
        );
      },
      reject: () => {
        return;
      }
    });
  }

  onLazyLoad(event: any): void {
    this.currentPage = event.first / event.rows;
    this.getInvoices(this.currentPage, event.rows);
  }

}
