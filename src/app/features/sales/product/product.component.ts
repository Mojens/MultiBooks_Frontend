import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {ProductApiService} from "./product.api.service";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ProductResponse} from "../../../models/Product/product.models";
import {TeamManagementApiService} from "../../team-management/team-management.api.service";
import DOMPurify from 'dompurify';
import {ToastrService} from "ngx-toastr";
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  faClipboardCheck = faClipboardCheck;

  items: MenuItem[] | undefined;

  products: ProductResponse[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  currentPage: number = 0;
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
    this.items = [{label: 'Sales', routerLink: '/sales'}, {label: 'Products', routerLink: '/sales/product'}];
    this.getProducts(this.currentPage, this.rows);
  }

  getProducts(currentPage: number, rows: number) {
    this.productService.getProducts(this.currentBusinessTeamCVRNumber, currentPage, rows).subscribe((response: any) => {
      this.products = response.data.content;
      this.totalRecords = response.data.totalElements;
    });
  }

  onLazyLoad(event: any): void {
    this.currentPage = event.first / event.rows;
    this.getProducts(this.currentPage, event.rows);
  }

  seeDetails(product: ProductResponse) {
    const rawProductDetails = `
    <div>
      <p><b>Product Name:</b> ${product.productName}</p>
      <p><b>Product Code:</b> ${product.productCode}</p>
      <p><b>Amount:</b> ${product.productAmount}</p>
      <p><b>Product Unit:</b> ${product.productUnit}</p>
      <p><b>Price Excl. VAT:</b> ${product.productPriceExclVAT}</p>
      <p><b>Price Incl. VAT:</b> ${product.productPriceInclVAT}</p>
      <p><b>Account:</b> ${product.productAccount}</p>
      <p><b>Description:</b> ${product.productDescription}</p>
    </div>
  `;
    const productDetails = DOMPurify.sanitize(rawProductDetails);
    this.confirmationService.confirm({
      message: productDetails,
      header: 'Product Details',
      icon: 'pi pi-info-circle',
      acceptVisible: false,
      rejectLabel: 'Close',
      rejectButtonStyleClass: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    });
  }

  deleteProduct(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
      rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      accept: () => {
        this.productService.deleteProduct(id).subscribe(
          (response) => {
            this.products = this.products.filter((product) => product.id !== id);
            this.totalRecords -= 1;
            if (this.products.length === 0 && this.currentPage > 0) {
              this.currentPage -= 1;
            }
            this.getProducts(this.currentPage, this.rows);
            this.toast.success('Successfully deleted product');
          });
      },
      reject: () => {
        return;
      }
    });
  }

  navigateToCreateProduct() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  navigateToEditProduct(id: number) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }


}
