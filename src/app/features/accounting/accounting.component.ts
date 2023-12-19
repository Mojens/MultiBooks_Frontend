import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";
import {ButtonModule} from "primeng/button";
import { TabViewModule } from 'primeng/tabview';
import {AccountingApiService} from "./accounting.api.service";
import {TeamManagementApiService} from "../team-management/team-management.api.service";
import {AccountingRecordCashResponse, AccountingRecordCreditResponse} from "../../models/Accounting/Accounting.models";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {Validations} from "../../@shared/validations";
import {Router} from "@angular/router";
import DOMPurify from 'dompurify';
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonModule, TabViewModule, RippleModule, TableModule, TooltipModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.css',
})
export class AccountingComponent implements OnInit{

  faFileInvoiceDollar = faFileInvoiceDollar;

  currentBusinessTeamCVRNumber: number = 0;

  accountingRecordCash: AccountingRecordCashResponse[] = [];
  totalRecordsCash: number = 0;
  rowsCash: number = 5;
  currentPageCash: number = 0;

  accountingRecordCredit: AccountingRecordCreditResponse[] = [];
  totalRecordsCredit: number = 0;
  rowsCredit: number = 5;
  currentPageCredit: number = 0;

  constructor(private accountingService: AccountingApiService,
              private teamService: TeamManagementApiService,
              private route: Router,
              private toast: ToastrService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.getAccountingRecordCash(this.currentPageCash, this.rowsCash);
    this.getAccountingRecordCredit(this.currentPageCredit, this.rowsCredit);
  }

  getAccountingRecordCash(page: number, size: number) {
    this.accountingService.getAccountingRecordCash(this.currentBusinessTeamCVRNumber, page, size).subscribe((response) => {
      this.accountingRecordCash = response.data.content;
      console.log(this.accountingRecordCash);
      this.totalRecordsCash = response.data.totalElements;
    });
  }

  getAccountingRecordCredit(page: number, size: number) {
    this.accountingService.getAccountingRecordCredit(this.currentBusinessTeamCVRNumber, page, size).subscribe((response) => {
      this.accountingRecordCredit = response.data.content;
      this.totalRecordsCredit = response.data.totalElements;
    });
  }

  onLazyLoadCredit(event: any): void {
    this.currentPageCredit = event.first / event.rows;
    this.getAccountingRecordCredit(this.currentPageCredit, event.rows);
  }

  onLazyLoadCash(event: any): void {
    this.currentPageCash = event.first / event.rows;
    this.getAccountingRecordCredit(this.currentPageCash, event.rows);
  }

  navigateToCreate() {
    this.route.navigate(['accounting/create']);
  }

  onDetailAccountingRecordCash(accountingRecord: AccountingRecordCashResponse) {
    const rawRecordDetails = `
  <div>
    <p><b>Document Date:</b> ${accountingRecord.documentDate.toString().split('T')[0]}</p>
    <p><b>Holdings:</b> ${accountingRecord.holdings}</p>
    <p><b>Bought From:</b> ${accountingRecord.boughtFrom}</p>
    <p><b>Subtotal VAT:</b> ${accountingRecord.subTotalVat}</p>
    <p><b>Subtotal No VAT:</b> ${accountingRecord.subTotalNoVat}</p>
    <p><b>Total:</b> ${accountingRecord.total}</p>
    <p><b>Accounting Records:</b></p>
    <ul>
      ${accountingRecord.accountingRecords.map(record => `
        <li>
          <b>Account:</b> ${record.account}
          <b>Description:</b> ${record.description}
          <b>Price incl vat:</b> ${record.priceInclVat}
          <b>Vat:</b> ${record.vat}
        </li>
      `).join('')}
    </ul>
    <p><b>Business Team:</b> ${accountingRecord.businessTeam.companyName}</p>
  </div>
`;

    const recordDetails = DOMPurify.sanitize(rawRecordDetails);
    this.confirmationService.confirm({
      message: recordDetails,
      header: 'Product Details',
      icon: 'pi pi-info-circle',
      acceptVisible: false,
      rejectLabel: 'Close',
      rejectButtonStyleClass: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    });
  }
  onDetailAccountingRecordCredit(accountingRecord: AccountingRecordCreditResponse) {
    const rawRecordDetails = `
  <div>
    <p><b>Document Date:</b> ${accountingRecord.documentDate.toString().split('T')[0]}</p>
    <p><b>Holdings:</b> ${accountingRecord.dueDate.toString().split('T')[0]}</p>
    <p><b>Valuta:</b> ${accountingRecord.valuta}</p>
    <p><b>Bought From:</b> ${accountingRecord.boughtFrom}</p>
    <p><b>Subtotal VAT:</b> ${accountingRecord.subTotalVat}</p>
    <p><b>Subtotal No VAT:</b> ${accountingRecord.subTotalNoVat}</p>
    <p><b>Total:</b> ${accountingRecord.total}</p>
    <p><b>Accounting Records:</b></p>
    <ul>
      ${accountingRecord.accountingRecords.map(record => `
        <li>
          <b>Account:</b> ${record.account}
          <b>Description:</b> ${record.description}
          <b>Price incl vat:</b> ${record.priceInclVat}
          <b>Vat:</b> ${record.vat}
        </li>
      `).join('')}
    </ul>
    <p><b>Business Team:</b> ${accountingRecord.businessTeam.companyName}</p>
    <p><b>Supplier:</b> ${accountingRecord.supplier.companyName}</p>
  </div>
`;

    const recordDetails = DOMPurify.sanitize(rawRecordDetails);
    this.confirmationService.confirm({
      message: recordDetails,
      header: 'Product Details',
      icon: 'pi pi-info-circle',
      acceptVisible: false,
      rejectLabel: 'Close',
      rejectButtonStyleClass: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    });
  }

  onDeleteAccountingRecordCash(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this accounting record?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
      rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      accept: () => {
        this.accountingService.deleteAccountingRecordCash(id).subscribe(
          (response) => {
            this.accountingRecordCash = this.accountingRecordCash.filter((record) => record.id !== id);
            this.totalRecordsCash -= 1;
            if (this.accountingRecordCash.length === 0 && this.currentPageCash > 0) {
              this.currentPageCash -= 1;
            }
            this.getAccountingRecordCash(this.currentPageCash, this.rowsCash);
            this.toast.success('Successfully deleted accounting record');
          },
          (error) => {
            this.toast.error('Failed to delete accounting record. Please try again later.');
          }
        );
      },
      reject: () => {
        return;
      }
    });
  }
  onDeleteAccountingRecordCredit(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this accounting record?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
      rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      accept: () => {
        this.accountingService.deleteAccountingRecordCredit(id).subscribe(
          (response) => {
            this.accountingRecordCredit = this.accountingRecordCredit.filter((record) => record.id !== id);
            this.totalRecordsCredit -= 1;
            if (this.accountingRecordCredit.length === 0 && this.currentPageCredit > 0) {
              this.currentPageCredit -= 1;
            }
            this.getAccountingRecordCredit(this.currentPageCredit, this.rowsCredit);
            this.toast.success('Successfully deleted accounting record');
          },
          (error) => {
            this.toast.error('Failed to delete accounting record. Please try again later.');
          }
        );
      },
      reject: () => {
        return;
      }
    });
  }

  protected readonly Validations = Validations;
}
