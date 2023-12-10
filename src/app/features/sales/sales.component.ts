import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {SalesApiService} from "./sales.api.service";
import {TeamManagementApiService} from "../team-management/team-management.api.service";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{
  faDollarSign = faDollarSign;
  currentBusinessTeamCVRNumber: number = 0;

  constructor(private route: Router,
              private salesService: SalesApiService,
              private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);

  }

  navigateToSales(){
    this.salesService.createInvoice(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.route.navigate(['sales/create/', Number(response.data.invoiceNumber)]);
    });
  }
  navigateToProducts(){
    this.route.navigate(['sales/product']);
  }

}
