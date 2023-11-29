import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{
  faDollarSign = faDollarSign;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  navigateToSales(){
    this.route.navigate(['sales/create']);
  }
  navigateToProducts(){
    this.route.navigate(['sales/product']);

  }

}
