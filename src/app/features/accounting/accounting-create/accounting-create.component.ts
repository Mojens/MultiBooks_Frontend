import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {AccountingRecordCashRequest, AccountingRecordCreditRequest} from "../../../models/Accounting/Accounting.models";
import {AccountingApiService} from "../accounting.api.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";
import {CardModule} from "primeng/card";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {FieldsetModule} from "primeng/fieldset";
import {TeamManagementApiService} from "../../team-management/team-management.api.service";

@Component({
  selector: 'app-accounting-create',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CardModule, BreadcrumbModule, FieldsetModule],
  templateUrl: './accounting-create.component.html',
  styleUrl: './accounting-create.component.css'
})
export class AccountingCreateComponent implements OnInit {

  faFileInvoiceDollar = faFileInvoiceDollar;
  items: MenuItem[] | undefined;
  currentBusinessTeamCVRNumber: number = 0;

  accountingRecordCash: AccountingRecordCashRequest = {
    id: 0,
    documentDate: '',
    holdings: '',
    boughtFrom: '',
    subTotalVat: 0,
    subTotalNoVat: 0,
    total: 0,
    businessTeamCVRNumber: 0,
  }

  accountingRecordCredit: AccountingRecordCreditRequest = {
    id: 0,
    documentDate: '',
    dueDate: '',
    valuta: '',
    supplierId: 0,
    boughtFrom: '',
    subTotalVat: 0,
    subTotalNoVat: 0,
    total: 0,
    businessTeamCVRNumber: 0,
  }



  constructor(private route: Router,
              private service: AccountingApiService,
              private teamService: TeamManagementApiService) {
  }

  ngOnInit() {
    this.items = [{label: 'Accounting', routerLink: '/accounting'}, {label: 'Register purchase', routerLink: '/accounting/create'}];
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
  }

  navigateToCash() {
    this.accountingRecordCash.businessTeamCVRNumber = this.currentBusinessTeamCVRNumber;
    this.service.createAccountingRecordCash(this.accountingRecordCash).subscribe((response) => {
      this.route.navigate(['accounting/create/cash/', Number(response.data.id)]);
    });
  }
  navigateToCredit() {
    this.accountingRecordCredit.businessTeamCVRNumber = this.currentBusinessTeamCVRNumber;
    this.service.createAccountingRecordCredit(this.accountingRecordCredit).subscribe((response) => {
      this.route.navigate(['accounting/create/credit/', Number(response.data.id)]);
    });
  }
}
