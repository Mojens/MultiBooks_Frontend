import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";
import {ButtonModule} from "primeng/button";
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-accounting',
  standalone: true,
    imports: [CommonModule, FontAwesomeModule, ButtonModule, TabViewModule],
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.css',
})
export class AccountingComponent implements OnInit{

  faFileInvoiceDollar = faFileInvoiceDollar;

  ngOnInit(): void {
  }
}
