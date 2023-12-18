import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {faDashboard} from "@fortawesome/free-solid-svg-icons";
import { ChartModule } from 'primeng/chart';
import {CommonModule, DatePipe} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {DashboardApiService} from "./dashboard.api.service";
import {FormsModule} from "@angular/forms";
import {YearRange} from "../../models/Charts/charts.models";
import {ConfirmationService, MessageService} from "primeng/api";
import {TeamManagementApiService} from "../team-management/team-management.api.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule, ChartModule, CardModule, DropdownModule, FormsModule],
  providers: [DatePipe, MessageService, ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  faDashboard = faDashboard;
  currentBusinessTeamCVRNumber: number = 0;

  currentYear = new Date().getFullYear().toString();
  graphData: any;
  graphOptions: any;
  yearOptions: any[] = [];
  selectedYear:any = {label: new Date().getFullYear().toString(), value: new Date().getFullYear().toString()};

  graphOneQuotaOne: number = 0;
  graphOneQuotaTwo: number = 0;
  graphOneQuotaThree: number = 0;
  graphOneQuotaFour: number = 0;

  constructor(private router: Router,
              private dashboardService: DashboardApiService,
              private datePipe: DatePipe,
              private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
    this.yearOptions = this.dashboardService.getYearOptions();
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.graphOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00Z')?.split('+')[0] + 'Z';
  }

  onYearChange(event:any){
    let chosenYear = Number(event.value.value);
    const firstDayOfYear = new Date(chosenYear, 0, 1);
    const lastDayOfYear = new Date(chosenYear, 11, 31);
    const start = this.formatDate(firstDayOfYear);
    const end = this.formatDate(lastDayOfYear);
    this.dashboardService.getSalesYearly(this.currentBusinessTeamCVRNumber, start, end).subscribe((response) => {
      response.data.forEach((item) => {
        switch (item.quarter) {
          case 'Q1':
            this.graphOneQuotaOne = item.total;
            break;
          case 'Q2':
            this.graphOneQuotaTwo = item.total;
            break;
          case 'Q3':
            this.graphOneQuotaThree = item.total;
            break;
          case 'Q4':
            this.graphOneQuotaFour = item.total;
            break;
        }
        this.graphData = {
          labels: ['Quota 1', 'Quota 2', 'Quota 3', 'Quota 4'],
          datasets: [
            {
              label: `Sales`,
              data: [this.graphOneQuotaOne, this.graphOneQuotaTwo, this.graphOneQuotaThree, this.graphOneQuotaFour],
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };
      });
    });
  }


}
