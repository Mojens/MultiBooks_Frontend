import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {ProductApiService} from "../product.api.service";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ProductRequest} from "../../../../models/Product/product.models";
import {TeamManagementApiService} from "../../../team-management/team-management.api.service";
import {ToastrService} from "ngx-toastr";
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {EditorModule} from 'primeng/editor';
import {Variables} from "../../../../@shared/variables";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule, ReactiveFormsModule, FormsModule, DropdownModule, EditorModule],
  providers: [ConfirmationService],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  faClipboardCheck = faClipboardCheck;
  items: MenuItem[] | undefined;
  unitOptions: any[] = [];
  accountOptions: any[] = [];

  formData: ProductRequest = {
    productName: '',
    productCode: 0,
    productAmount: 0,
    productUnit: '',
    productPriceExclVAT: 0,
    productPriceInclVAT: 0,
    productDescription: '',
    productAccount: '',
    businessCVRNumber: 0
  };

  currentBusinessTeamCVRNumber: number = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductApiService,
              private teamService: TeamManagementApiService,
              private toast: ToastrService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.items = [{label: 'Sales', routerLink: '/sales'}, {
      label: 'Products',
      routerLink: '/sales/product'
    }, {label: 'Create Product', routerLink: '/sales/product/create'}];
    this.unitOptions = Variables.unitOptions;
    this.accountOptions = Variables.accountOptions;
  }

  onCancelCreateProduct() {
    if (this.formData.productName !== '' || this.formData.productCode !== 0 || this.formData.productAmount !== 0 || this.formData.productUnit !== '' || this.formData.productPriceExclVAT !== 0 || this.formData.productPriceInclVAT !== 0 || this.formData.productDescription !== '' || this.formData.productAccount !== '') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to leave this page?',
        header: 'Leave confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
        rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',

        accept: () => {
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        reject: () => {
        }
      });
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onCreateProduct() {
    const productRequest: ProductRequest = {
      ...this.formData,
      businessCVRNumber: this.currentBusinessTeamCVRNumber,
      productPriceInclVAT: this.formData.productPriceExclVAT * 1.25
    }
    let validForm = this.validForm(productRequest);
    if (validForm) {
      this.productService.createProduct(productRequest).subscribe((response: any) => {
        this.toast.success('Product created successfully');
        this.router.navigate(['../'], {relativeTo: this.route});
      }, error => {
        this.toast.error('Something went wrong');
      })
    }
  }

  validForm(request: ProductRequest): boolean {
    if (request.productName === '') {
      this.toast.error('Product name is required');
      return false;
    } else if (request.productCode === 0) {
      this.toast.error('Product code is required');
      return false;
    } else if (request.productAmount === 0) {
      this.toast.error('Product amount is required');
      return false;
    } else if (request.productUnit === '') {
      this.toast.error('Product unit is required');
      return false;
    } else if (request.productPriceExclVAT < 0) {
      this.toast.error('Product price is required');
      return false;
    } else if (request.productAccount === '') {
      this.toast.error('Product account is required');
      return false;
    } else if (request.productPriceExclVAT < 0) {
      this.toast.error('Product price is required');
      return false;
    }
    return true;
  }

}
