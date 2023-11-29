import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDollarSign, faDashboard} from "@fortawesome/free-solid-svg-icons";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  faDollarSign = faDollarSign;

  items: MenuItem[] | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.items = [{ label: 'Sales', routerLink: '/sales' }, { label: 'Products',routerLink:'/sales/product' }];
  }


}
