import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {ProductApiService} from "../product.api.service";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ProductResponse, UpdateProductRequest} from "../../../../models/Product/product.models";
import {TeamManagementApiService} from "../../../team-management/team-management.api.service";
import DOMPurify from 'dompurify';
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Variables} from "../../../../@shared/variables";


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule, DropdownModule, ReactiveFormsModule, FormsModule],
  providers: [ConfirmationService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId: number = 0;
  items: MenuItem[] | undefined;
  faClipboardCheck = faClipboardCheck;
  unitOptions: any[] = [];
  accountOptions: any[] = [];
  currentBusinessTeamCVRNumber: number = 0;

  productData: ProductResponse = {
    id: 0,
    productName: '',
    productCode: 0,
    productAmount: 0,
    productUnit: '',
    productPriceExclVAT: 0,
    productPriceInclVAT: 0,
    productDescription: '',
    productAccount: '',
  }

  editFormData: UpdateProductRequest = {
    productName: '',
    id: 0,
    productCode: 0,
    productAmount: 0,
    productUnit: '',
    productPriceExclVAT: 0,
    productPriceInclVAT: 0,
    productDescription: '',
    productAccount: '',
    businessCVRNumber: 0
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductApiService,
              private teamService: TeamManagementApiService,
              private toast: ToastrService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.unitOptions = Variables.unitOptions;
    this.accountOptions = Variables.accountOptions;
    this.productId = Number(this.route.snapshot.params['productId'])
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.items = [{label: 'Sales', routerLink: '/sales'}, {label: 'Products', routerLink: '/sales/product'}, {label: 'Edit Product', routerLink: `/sales/product/edit/${this.productId}`}];
    this.getProductData();
  }

  getProductData(){
    this.productService.getProduct(this.productId).subscribe((response) => {
      this.productData = response.data;
      this.editFormData = {
        productName: this.productData.productName,
        id: this.productData.id,
        productCode: this.productData.productCode,
        productAmount: this.productData.productAmount,
        productUnit: this.productData.productUnit,
        productPriceExclVAT: this.productData.productPriceExclVAT,
        productPriceInclVAT: this.productData.productPriceInclVAT,
        productDescription: this.productData.productDescription,
        productAccount: this.productData.productAccount,
        businessCVRNumber: this.currentBusinessTeamCVRNumber
      }
    })
  }
  onCancelEditProduct() {
    if(this.editFormData.productName !== this.productData.productName || this.editFormData.productCode !== this.productData.productCode || this.editFormData.productAmount !== this.productData.productAmount || this.editFormData.productUnit !== this.productData.productUnit || this.editFormData.productPriceExclVAT !== this.productData.productPriceExclVAT || this.editFormData.productPriceInclVAT !== this.productData.productPriceInclVAT || this.editFormData.productDescription !== this.productData.productDescription || this.editFormData.productAccount !== this.productData.productAccount) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to leave this page?',
        header: 'Leave confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
        rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',

        accept: () => {
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        reject: () => {
        }
      });
    }else{
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }

  onEditProduct() {
    const productRequest: UpdateProductRequest = {
      ...this.editFormData,
      businessCVRNumber: this.currentBusinessTeamCVRNumber,
      productPriceInclVAT: this.editFormData.productPriceExclVAT * 1.25
    }
    this.productService.updateProduct(productRequest).subscribe((response: any) => {
      this.toast.success('Product updated successfully');
      this.router.navigate(['../../'], {relativeTo: this.route});
    });
  }

}
