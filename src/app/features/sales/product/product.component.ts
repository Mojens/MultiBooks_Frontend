import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  faDollarSign = faDollarSign;
  ngOnInit(): void {
  }


}
