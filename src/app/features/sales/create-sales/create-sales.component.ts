import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-sales',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule],
  templateUrl: './create-sales.component.html',
  styleUrl: './create-sales.component.css'
})
export class CreateSalesComponent implements OnInit{
  faDollarSign = faDollarSign;
  items: MenuItem[] | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.items = [{ label: 'Sales', routerLink: '/sales' }, { label: 'Create sale',routerLink:'/sales/create' }];
  }

}
