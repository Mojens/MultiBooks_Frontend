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
import {UpdateProductRequest} from "../../../../models/Product/product.models";
import {TeamManagementApiService} from "../../../team-management/team-management.api.service";
import DOMPurify from 'dompurify';
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId: number = 0;
  items: MenuItem[] | undefined;
  faClipboardCheck = faClipboardCheck;

  editFormData: UpdateProductRequest = {
    productName: '',
    id: 0,
    productCode: 0,
    productAmount: 0,
    productUnit: '',
    productPriceExclVAT: 0,
    productPriceInclVAT: 0,
    productDescription: '',
    productAccount: 0,
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductApiService,
              private teamService: TeamManagementApiService,
              private toast: ToastrService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.params['productId'])
    this.items = [{label: 'Sales', routerLink: '/sales'}, {label: 'Products', routerLink: '/sales/product'}, {label: 'Edit Product', routerLink: `/sales/product/edit/${this.productId}`}];
  }

}
