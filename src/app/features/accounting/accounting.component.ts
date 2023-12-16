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

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonModule, TabViewModule, RippleModule, TableModule, TooltipModule],
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
              private route: Router,) {
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

  protected readonly Validations = Validations;
}
