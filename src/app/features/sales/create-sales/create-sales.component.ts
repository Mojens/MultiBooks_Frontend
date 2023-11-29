import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-create-sales',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule],
  templateUrl: './create-sales.component.html',
  styleUrl: './create-sales.component.css'
})
export class CreateSalesComponent implements OnInit{
  faDollarSign = faDollarSign;
  ngOnInit(): void {
  }

}
