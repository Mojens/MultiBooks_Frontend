import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceFillRequest} from "../../../models/Invoice/invoice.models";
import {ContactsApiService} from "../../contacts/contacts.api.service";
import {ProductApiService} from "../product/product.api.service";
import {DropdownModule} from "primeng/dropdown";
import {SalesApiService} from "../sales.api.service";
import {TeamManagementApiService} from "../../team-management/team-management.api.service";
import {ContactsResponse} from "../../../models";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {Variables} from "../../../@shared/variables";
import {DialogModule} from "primeng/dialog";
import {PickListModule} from 'primeng/picklist';
import {ProductResponse} from "../../../models/Product/product.models";
import {ToastrService} from "ngx-toastr";
import {ProductToSaleRequest} from "../../../models/ProductToSale/productToSale.models";
import {TooltipModule} from "primeng/tooltip";
import {Validations} from "../../../@shared/validations";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-create-sales',
  standalone: true,
  providers: [DatePipe, MessageService, ConfirmationService],
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, DropdownModule, FormsModule, CalendarModule, DialogModule, PickListModule, TooltipModule, ConfirmDialogModule],
  templateUrl: './create-sales.component.html',
  styleUrl: './create-sales.component.css'
})
export class CreateSalesComponent implements OnInit {
  faDollarSign = faDollarSign;
  invoiceStatusOptions: any[] = [];
  items: MenuItem[] | undefined;
  contacts: ContactsResponse[] | undefined;
  currentBusinessTeamCVRNumber: number = 0;
  invoiceNumber: number = 0;
  showAddProductDialog: boolean = false;

  hasChanges: boolean = false;

  unitOptions: any[] = [];

  selectedStatus: number = 0;
  chosenProducts: ProductResponse[] = [];

  selectedContact: any;
  selectedDate: Date = new Date();

  contactOptions: any[] = [];
  statusOptions: any[] = [];

  invoiceForm: InvoiceFillRequest = {
    invoiceNumber: 0,
    invoiceComment: '',
    invoiceTitle: 'Invoice',
    invoiceDate: '',
    subTotal: 0,
    total: 0,
    statusCode: 0,
    EditedBy: '',
    contactId: 0
  }

  productRequests: ProductToSaleRequest[] = [];

  currentProducts: ProductResponse[] = [];

  subTotalWithVat: number = -1;
  subTotalWithoutVat: number = -1;
  vatPrice: number = -1;
  totalPrice: number = -1;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactService: ContactsApiService,
              private productService: ProductApiService,
              private salesService: SalesApiService,
              private teamService: TeamManagementApiService,
              private datePipe: DatePipe,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.unitOptions = Variables.unitOptions;
    this.statusOptions = Variables.invoiceStatusOptions;
    this.invoiceStatusOptions = Variables.invoiceStatusOptions;
    this.invoiceNumber = Number(this.route.snapshot.params['invoiceId'])
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.items = [{label: 'Sales', routerLink: '/sales'}, {label: 'Create sale', routerLink: '/sales/create'}];
    this.getContacts();
    this.getProducts();
    this.hasChanges = true;
  }

  hasUnsavedChanges(): boolean {
    if (this.productRequests.length > 0) {
      return true;
    }
    if (this.subTotalWithVat !== -1) {
      return true;
    }
    if (this.subTotalWithoutVat !== -1) {
      return true;
    }
    if (this.vatPrice !== -1) {
      return true;
    }
    if (this.totalPrice !== -1) {
      return true;
    }
    if (this.hasChanges) {
      return true;
    }
    return false;
  }

  getContacts() {
    this.contactService.getContacts(this.currentBusinessTeamCVRNumber, 0, 100).subscribe((response) => {
      this.contacts = response.data.content;
      this.contactOptions = this.contacts.map((contact) => {
        return {label: contact.companyName, value: contact.id}
      })
    });
  }

  getProducts() {
    this.productService.getProducts(this.currentBusinessTeamCVRNumber, 0, 100).subscribe((response) => {
      this.currentProducts = response.data.content;
    });
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00Z')?.split('+')[0] + 'Z';
  }


  showAddProductDialogFunc() {
    this.showAddProductDialog = true;
  }

  removeProductFromInvoice(product: ProductResponse) {
    this.chosenProducts = this.chosenProducts.filter((chosenProduct) => {
      return chosenProduct.id !== product.id;
    })
    this.productRequests = this.productRequests.filter((productRequest) => {
      return productRequest.productId !== Number(product.id);
    })
    this.currentProducts.push(product);
    this.currentProducts = [...this.currentProducts];
    this.chosenProducts = [...this.chosenProducts];
    this.toast.error('Product removed from invoice', 'Success');
  }

  chosenToCurrent(event: any) {
    this.productRequests = this.productRequests.filter((productRequest) => {
      event.items.forEach((item: ProductResponse) => {
        return productRequest.productId !== Number(item.id);
      });
    })
    this.toast.error('Product removed from invoice', 'Success');
  }

  currentToChosen(event: any) {
    event.items.forEach((item: ProductResponse) => {
      const request: ProductToSaleRequest = {
        productId: Number(item.id),
        productToSaleId: 0,
        productUnit: '',
        productAmount: 1,
        productDiscount: 0,
        productPriceExclVAT: item.productPriceExclVAT,
        productPriceAfterDiscount: item.productPriceExclVAT
      }
      this.productRequests.push(request);
    });
    this.toast.success('Product added to invoice', 'Success');
  }

  allChosenToCurrent(event: any) {
    this.productRequests = [];
    this.toast.error('All products removed from invoice', 'Success');
  }

  allCurrentToChosen(event: any) {
    event.items.forEach((item: ProductResponse) => {
      const request: ProductToSaleRequest = {
        productId: Number(item.id),
        productToSaleId: 0,
        productUnit: '',
        productAmount: 1,
        productDiscount: 0,
        productPriceExclVAT: item.productPriceExclVAT,
        productPriceAfterDiscount: item.productPriceExclVAT
      }
      this.productRequests.push(request);
    })
    this.toast.success('All products added to invoice', 'Success');
  }

  removeAllProducts() {
    this.chosenProducts = [];
    this.productRequests = [];
    this.toast.error('All products removed from invoice', 'Success');
  }

  changeQuantity(event: any, product: ProductResponse) {
    const newProductRequests = [...this.productRequests];
    newProductRequests.forEach((productRequest) => {
      if (productRequest.productId === Number(product.id)) {
        productRequest.productAmount = Number(event.target.value);
      }
    });
    this.productRequests = newProductRequests;
    this.getDiscountedPrice(product);
  }

  changeDiscount(event: any, product: ProductResponse) {
    if (event.target.value > 100) {
      event.target.value = 100;
    } else if (event.target.value < 0) {
      event.target.value = 0;
    }
    this.productRequests.forEach((productRequest) => {
      if (productRequest.productId === Number(product.id)) {
        productRequest.productDiscount = Number(event.target.value);
      }
    });
    this.getDiscountedPrice(product);
  }

  changeUnit(event: any, product: ProductResponse) {
    this.productRequests.forEach((productRequest) => {
      if (productRequest.productId === Number(product.id)) {
        productRequest.productUnit = event.value;
      }
    });
  }

  changeStatus(event: any) {
    this.selectedStatus = event.value.value
  }

  getDiscountedPrice(product: ProductResponse) {
    let price = product.productPriceExclVAT;
    let discountedPrice = 0;
    let finalPrice = 0;

    for (const productRequest of this.productRequests) {
      if (productRequest.productId === Number(product.id)) {
        if (productRequest.productDiscount > 0) {
          discountedPrice = (productRequest.productDiscount * productRequest.productAmount * price) / 100;
          finalPrice = (price * productRequest.productAmount) - discountedPrice;
          productRequest.productPriceAfterDiscount = finalPrice;
        } else {
          finalPrice = price * productRequest.productAmount;
          productRequest.productDiscount = 0;
        }
        break;
      }
    }
    return finalPrice;
  }

  getSubTotalInclVAT() {
    this.subTotalWithVat = 0;
    for (const productRequest of this.productRequests) {
      this.subTotalWithVat += (productRequest.productPriceAfterDiscount + (productRequest.productPriceAfterDiscount / 4));
    }
    return this.subTotalWithVat;
  }

  getSubTotalExclVAT() {
    this.subTotalWithoutVat = 0;
    for (const productRequest of this.productRequests) {
      this.subTotalWithoutVat += productRequest.productPriceAfterDiscount;
    }
    return this.subTotalWithoutVat;
  }

  getVAT() {
    this.vatPrice = 0;
    for (const productRequest of this.productRequests) {
      this.vatPrice += (productRequest.productPriceAfterDiscount / 4);
    }
    return this.vatPrice;
  }

  getTotal() {
    this.totalPrice = 0;
    for (const productRequest of this.productRequests) {
      this.totalPrice += productRequest.productPriceAfterDiscount;
    }
    return this.totalPrice;
  }

  calculateTotal() {
    console.log('calculateTotal')
    this.getTotal();
    this.getVAT();
    this.getSubTotalExclVAT();
    this.getSubTotalInclVAT();
  }

  onCreateInvoice() {
    this.isFormValid();
    const invoiceRequest: InvoiceFillRequest = {
      ...this.invoiceForm,
      invoiceDate: this.formatDate(this.selectedDate),
      total: this.totalPrice,
      subTotal: this.subTotalWithoutVat,
      statusCode: this.selectedStatus,
      invoiceNumber: this.invoiceNumber,
      contactId: this.selectedContact.value,
    }
    this.salesService.fillInvoice(invoiceRequest).subscribe((response) => {
      this.toast.success('Invoice created', 'Success');
      this.hasChanges = false;
      this.resetForms();
      this.router.navigate(['/sales']);
    }, (error) => {
      this.toast.error('Failed to create invoice, try again later', 'Error');
    });
    this.productRequests.forEach((productRequest) => {
      this.salesService.addProductToInvoice(this.invoiceNumber, productRequest).subscribe((response) => {
      }, (error) => {
        this.toast.error('Failed to create invoice, try again later', 'Error');
      });
    });
  }

  isFormValid(): void {
    if (this.totalPrice === -1) {
      this.toast.error('Remember to click on calculate price', 'Error');
    }
    if (this.subTotalWithVat === -1) {
      this.toast.error('Remember to click on calculate price', 'Error');
    }
    if (this.subTotalWithoutVat === -1) {
      this.toast.error('Remember to click on calculate price', 'Error');
    }
    if (this.vatPrice === -1) {
      this.toast.error('Remember to click on calculate price', 'Error');
    }
    if (this.selectedContact.value === undefined) {
      this.toast.error('Remember to choose a contact', 'Error');
    }
    if (this.productRequests.length > 0) {
      this.productRequests.forEach((productRequest) => {
        if (productRequest.productUnit === null) {
          this.toast.error('Remember to choose a unit', 'Error');
        }
      });
    }
  }

  resetForms() {
    this.productRequests = [];
    this.chosenProducts = [];
    this.invoiceForm = {
      invoiceNumber: 0,
      invoiceComment: '',
      invoiceTitle: 'Invoice',
      invoiceDate: '',
      subTotal: 0,
      total: 0,
      statusCode: 0,
      EditedBy: '',
      contactId: 0
    }
    this.subTotalWithoutVat = -1;
    this.subTotalWithVat = -1;
    this.vatPrice = -1;
    this.totalPrice = -1;
  }
}
