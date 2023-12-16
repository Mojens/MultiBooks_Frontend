import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountingApiService} from "../../accounting.api.service";
import {ToastrService} from "ngx-toastr";
import {TeamManagementApiService} from "../../../team-management/team-management.api.service";
import {AccountingRecordCashRequest} from "../../../../models/Accounting/Accounting.models";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-accounting-create-cash',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, FontAwesomeModule, PaginatorModule],
  providers: [DatePipe, MessageService, ConfirmationService],
  templateUrl: './accounting-create-cash.component.html',
  styleUrl: './accounting-create-cash.component.css'
})
export class AccountingCreateCashComponent implements OnInit {

  faFileInvoiceDollar = faFileInvoiceDollar;
  items: MenuItem[] | undefined;
  currentBusinessTeamCVRNumber: number = 0;
  currentAccountingRecordCashId: number = 0;

  formData: AccountingRecordCashRequest = {
    id: 0,
    documentDate: '',
    holdings: '',
    boughtFrom: '',
    subTotalVat: 0,
    subTotalNoVat: 0,
    total: 0,
    businessTeamCVRNumber: 0,
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountingService: AccountingApiService,
              private toast: ToastrService,
              private teamService: TeamManagementApiService,){
  }

  ngOnInit() {
    this.currentAccountingRecordCashId = Number(this.route.snapshot.params['id'])
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber)
    this.items = [{label: 'Accounting', routerLink: '/accounting'}, {label: 'Register purchase', routerLink: '/accounting/create'}, {label: 'Register cash purchase', routerLink: `/accounting/create/cash/${this.currentAccountingRecordCashId}`}];
  }

}
