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
import {AccountingRecordCashRequest, AccountingRecordRequest} from "../../../../models/Accounting/Accounting.models";
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {Variables} from "../../../../@shared/variables";
import {ContactsApiService} from "../../../contacts/contacts.api.service";
import {Validations} from "../../../../@shared/validations";

@Component({
  selector: 'app-accounting-create-cash',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, FontAwesomeModule, PaginatorModule, CalendarModule],
  providers: [DatePipe, MessageService, ConfirmationService],
  templateUrl: './accounting-create-cash.component.html',
  styleUrl: './accounting-create-cash.component.css'
})
export class AccountingCreateCashComponent implements OnInit {

  faFileInvoiceDollar = faFileInvoiceDollar;
  items: MenuItem[] | undefined;
  currentBusinessTeamCVRNumber: number = 0;
  currentAccountingRecordCashId: number = 0;
  selectedDate: Date = new Date();

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

  recordRequests: AccountingRecordRequest[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountingService: AccountingApiService,
              private toast: ToastrService,
              private teamService: TeamManagementApiService,
              private datePipe: DatePipe,
              private confirmationService: ConfirmationService,){
  }

  ngOnInit() {
    this.currentAccountingRecordCashId = Number(this.route.snapshot.params['id'])
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber)
    this.items = [{label: 'Accounting', routerLink: '/accounting'}, {label: 'Register purchase', routerLink: '/accounting/create'}, {label: 'Register cash purchase', routerLink: `/accounting/create/cash/${this.currentAccountingRecordCashId}`}];
  }

  addNewRecordRequest(){
    let request:AccountingRecordRequest = {
      priceInclVat: 0,
      vat: 0,
      description: '',
      account: '',
      accountingRecordCashId: this.currentAccountingRecordCashId,
      accountingRecordCreditId: 0
    };
    this.recordRequests.push(request);
    this.toast.success('Product added');
  }

  removeRecordRequest(index: number){
    this.recordRequests.splice(index, 1);
    this.toast.error('Product removed');
  }

  updateVat(index: number){
    this.recordRequests[index].vat = this.recordRequests[index].priceInclVat * 0.25;
    this.onChangeRequests();
  }

  onChangeRequests(){
    this.formData.subTotalVat = this.recordRequests.map(x => x.priceInclVat).reduce((a, b) => a + b, 0);
    let vat = this.recordRequests.map(x => x.vat).reduce((a, b) => a + b, 0);
    this.formData.subTotalNoVat = this.formData.subTotalVat - vat;
    this.formData.total = this.formData.subTotalVat;
  }

  onSelectBoughtFrom(event:any){
    this.formData.boughtFrom = event.value;
  }

  onSelectHoldings(event:any){
    this.formData.holdings = event.value.value;
  }

  onSelectAccount(event:any, index: number){
    this.recordRequests[index].account = event.value.value;
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00Z')?.split('+')[0] + 'Z';
  }

  anyDescriptionEmpty(){
    return this.recordRequests.some((record) => {
      return record.description.length < 1;
    });
  }

  onSave(){
    this.formData.businessTeamCVRNumber = this.currentBusinessTeamCVRNumber;
    this.formData.id = this.currentAccountingRecordCashId;
    this.formData.documentDate = this.formatDate(this.selectedDate);
    this.accountingService.updateAccountingRecordCash(this.formData).subscribe((res) => {
      this.recordRequests.forEach((record) => {
        this.accountingService.createAccountingRecord(record).subscribe((res) => {
          this.toast.success('Purchase registered');
          this.router.navigate(['/accounting']);
        });
      });
    });
  }

  protected readonly Variables = Variables;
  protected readonly Validations = Validations;
}
