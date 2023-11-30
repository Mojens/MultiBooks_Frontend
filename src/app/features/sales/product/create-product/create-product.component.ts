import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {ProductApiService} from "../product.api.service";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ProductRequest} from "../../../../models/Product/product.models";
import {TeamManagementApiService} from "../../../team-management/team-management.api.service";
import DOMPurify from 'dompurify';
import {ToastrService} from "ngx-toastr";
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{

  faDollarSign = faDollarSign;
  items: MenuItem[] | undefined;

  formData: ProductRequest = {
    productName: '',
    productCode: 0,
    productAmount: 0,
    productUnit: '',
    productPriceExclVAT: 0,
    productPriceInclVAT: 0,
    productDescription: '',
    productAccount: 0,
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
    this.items = [{label: 'Sales', routerLink: '/sales'}, {label: 'Products', routerLink: '/sales/product'}, {label: 'Create Product', routerLink: '/sales/product/create'}];
  }

}
