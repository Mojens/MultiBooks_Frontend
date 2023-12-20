import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountingApiService} from "../../accounting.api.service";
import {ToastrService} from "ngx-toastr";
import {TeamManagementApiService} from "../../../team-management/team-management.api.service";
import {AccountingRecordCreditRequest, AccountingRecordRequest} from "../../../../models/Accounting/Accounting.models";
import {ContactsResponse} from "../../../../models";
import {ContactsApiService} from "../../../contacts/contacts.api.service";
import {Variables} from "../../../../@shared/variables";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {Validations} from "../../../../@shared/validations";

@Component({
  selector: 'app-accounting-create-credit',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, FontAwesomeModule, ButtonModule, CalendarModule, DropdownModule, FormsModule],
  providers: [DatePipe, MessageService, ConfirmationService],
  templateUrl: './accounting-create-credit.component.html',
  styleUrl: './accounting-create-credit.component.css'
})
export class AccountingCreateCreditComponent implements OnInit {

  faFileInvoiceDollar = faFileInvoiceDollar;
  items: MenuItem[] | undefined;
  currentBusinessTeamCVRNumber: number = 0;
  currentAccountingRecordCreditId: number = 0;
  selectedDocumentDate: Date = new Date();
  selectedDueDate: Date = new Date();
  selectedSupplier: any = null;

  suppliers: ContactsResponse[] = [];
  suppliersOptions: any[] = [];
  recordRequests: AccountingRecordRequest[] = [];

  formData: AccountingRecordCreditRequest = {
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountingService: AccountingApiService,
              private toast: ToastrService,
              private teamService: TeamManagementApiService,
              private contactService: ContactsApiService,
              private datePipe: DatePipe,
              private confirmationService: ConfirmationService,) {
  }

  ngOnInit(): void {
    this.currentAccountingRecordCreditId = Number(this.route.snapshot.params['id'])
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber)
    this.items = [{label: 'Accounting', routerLink: '/accounting'}, {
      label: 'Register purchase',
      routerLink: '/accounting/create'
    }, {
      label: 'Register credit purchase',
      routerLink: `/accounting/create/credit/${this.currentAccountingRecordCreditId}`
    }];
    this.getSuppliers();
  }

  getSuppliers() {
    this.contactService.getContacts(this.currentBusinessTeamCVRNumber, 0, 1000).subscribe((res) => {
      this.suppliers = res.data.content;
      this.suppliersOptions = this.suppliers.map((supplier) => {
        return {label: supplier.companyName, value: supplier.id};
      });
    });
  }

  addNewRecordRequest() {
    let request: AccountingRecordRequest = {
      priceInclVat: 0,
      vat: 0,
      description: '',
      account: '',
      accountingRecordCashId: 0,
      accountingRecordCreditId: this.currentAccountingRecordCreditId
    };
    this.recordRequests.push(request);
    this.toast.success('Product added');
  }

  updateVat(index: number) {
    this.recordRequests[index].vat = this.recordRequests[index].priceInclVat * 0.25;
    this.onChangeRequests();
  }

  onChangeRequests() {
    this.formData.subTotalVat = this.recordRequests.map(x => x.priceInclVat).reduce((a, b) => a + b, 0);
    let vat = this.recordRequests.map(x => x.vat).reduce((a, b) => a + b, 0);
    this.formData.subTotalNoVat = this.formData.subTotalVat - vat;
    this.formData.total = this.formData.subTotalVat;
  }

  removeRecordRequest(index: number) {
    this.recordRequests.splice(index, 1);
    this.toast.error('Product removed');
  }

  onSelectAccount(event: any, index: number) {
    this.recordRequests[index].account = event.value.value;
  }

  onSelectValuta(event: any) {
    this.formData.valuta = event.value.value
  }

  onSelectBoughtFrom(event: any) {
    this.formData.boughtFrom = event.value;
  }

  onSelectSupplier(event: any) {
    this.formData.supplierId = event.value.value;
  }

  anyDescriptionEmpty() {
    return this.recordRequests.some((record) => {
      return record.description.length < 1;
    });
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00Z')?.split('+')[0] + 'Z';
  }

  onSave() {
    this.formData.businessTeamCVRNumber = this.currentBusinessTeamCVRNumber;
    this.formData.id = this.currentAccountingRecordCreditId;
    this.formData.documentDate = this.formatDate(this.selectedDocumentDate);
    this.formData.dueDate = this.formatDate(this.selectedDueDate);
    let validForm = this.validateForm();
    if (validForm) {
      this.accountingService.updateAccountingRecordCredit(this.formData).subscribe((res) => {
        this.recordRequests.forEach((record) => {
          this.accountingService.createAccountingRecord(record).subscribe((res) => {
            this.toast.success('Purchase registered');
            this.router.navigate(['/accounting']);
          });
        });
      });
    }
  }

  validateForm(): boolean {
    this.recordRequests.forEach((record) => {
      if (record.priceInclVat < 0) {
        this.toast.error('Price must be greater than 0');
        return false;
      } else if (record.description.length < 1) {
        this.toast.error('Description is required');
        return false;
      } else if (this.formData.supplierId === 0) {
        this.toast.error('Supplier is required');
        return false;
      }
      return true;
    });
    return true
  }

  protected readonly Variables = Variables;
  protected readonly Validations = Validations;
}
