import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbModule} from "primeng/breadcrumb";

@Component({
  selector: 'app-vat',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule],
  templateUrl: './vat.component.html',
  styleUrl: './vat.component.css'
})
export class VatComponent implements OnInit{

    faPercent = faPercent;
    constructor() {
    }

  ngOnInit(): void {
  }

}
