import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-taxes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taxes.component.html',
  styleUrl: './taxes.component.css'
})
export class TaxesComponent {

  constructor(private router: Router) {
  }

  navigateToGovtax(){
    this.router.navigate(["/taxes/govtax"]);
  }
  navigateToVatTax(){
    this.router.navigate(["/taxes/vat"]);
  }
}
