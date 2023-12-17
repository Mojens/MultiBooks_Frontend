import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {faDashboard} from "@fortawesome/free-solid-svg-icons";
import { ChartModule } from 'primeng/chart';
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule, ChartModule],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  faDashboard = faDashboard;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

}
