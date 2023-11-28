import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-taxes',
  standalone: true,
    imports: [CommonModule, FontAwesomeModule],
  templateUrl: './taxes.component.html',
  styleUrl: './taxes.component.css'
})
export class TaxesComponent {

  faPercent = faPercent;
  constructor(private router: Router) {
  }

  navigateToGovtax(){
    this.router.navigate(["/taxes/govtax"]);
  }
  navigateToVatTax(){
    this.router.navigate(["/taxes/vat"]);
  }
}
