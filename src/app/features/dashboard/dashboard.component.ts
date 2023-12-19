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
import {ConfirmationService, MessageService} from "primeng/api";
import {TeamManagementApiService} from "../team-management/team-management.api.service";
import {circleOneOptions, documentStyle, graphOneOptions, graphTwoOptions} from "../../@shared/charts.config";

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
  yearOptions: any[] = [];
  graphOneSelectedYear:any = {label: new Date().getFullYear().toString(), value: new Date().getFullYear().toString()};
  graphTwoSelectedYearOne:any = {label: new Date().getFullYear().toString(), value: new Date().getFullYear().toString()};
  graphTwoSelectedYearTwo:any = {label: new Date().getFullYear().toString(), value: new Date().getFullYear().toString()};
  circleOneSelectedYear:any = {label: new Date().getFullYear().toString(), value: new Date().getFullYear().toString()};

  graphOneData: any;
  graphOneOptions: any;

  circleOneData: any;
  circleOneOptions: any;

  graphTwoData: any;
  graphTwoOptions: any;

  totalProducts: number = 0;
  totalUsers: number = 0;
  totalInvoices: number = 0;

  graphOneHasData: boolean = false;
  graphTwoHasData: boolean = false;
  circleOneHasData: boolean = false;


  constructor(private router: Router,
              private dashboardService: DashboardApiService,
              private datePipe: DatePipe,
              private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
    this.yearOptions = this.dashboardService.getYearOptions();
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.graphOneOptions = graphOneOptions;
    this.circleOneOptions = circleOneOptions;
    this.graphTwoData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86]
        }
      ]
    };
    this.graphTwoOptions = graphTwoOptions;
    this.getTotalProducts();
    this.getTotalUsers();
    this.getTotalInvoices();
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00Z')?.split('+')[0] + 'Z';
  }

  graphOneYearChange(event:any){
    let chosenYear = Number(event.value.value);
    const firstDayOfYear = new Date(chosenYear, 0, 1);
    const lastDayOfYear = new Date(chosenYear, 11, 31);
    const start = this.formatDate(firstDayOfYear);
    const end = this.formatDate(lastDayOfYear);
    let totalQuotaOne = 0;
    let totalQuotaTwo = 0;
    let totalQuotaThree = 0;
    let totalQuotaFour = 0;
    this.dashboardService.getSalesYearly(this.currentBusinessTeamCVRNumber, start, end).subscribe((response) => {
      response.data.forEach((item) => {
        switch (item.quarter) {
          case 'Q1':
            totalQuotaOne = item.total;
            break;
          case 'Q2':
            totalQuotaTwo = item.total;
            break;
          case 'Q3':
            totalQuotaThree = item.total;
            break;
          case 'Q4':
            totalQuotaFour = item.total;
            break;
        }
        this.graphOneHasData = totalQuotaOne > 0 || totalQuotaTwo > 0 || totalQuotaThree > 0 || totalQuotaFour > 0;
        this.graphOneData = {
          labels: ['Quota 1', 'Quota 2', 'Quota 3', 'Quota 4'],
          datasets: [
            {
              label: `Sales`,
              data: [totalQuotaOne, totalQuotaTwo, totalQuotaThree, totalQuotaFour],
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };
      });
    });
  }

  circleOneYearChange(event:any){
    let chosenYear = Number(event.value.value);
    const firstDayOfYear = new Date(chosenYear, 0, 1);
    const lastDayOfYear = new Date(chosenYear, 11, 31);
    const start = this.formatDate(firstDayOfYear);
    const end = this.formatDate(lastDayOfYear);
    let totalConfirmed = 0;
    let totalOverdue = 0;
    let totalPaid = 0;
    let totalOverpaid = 0;
    let totalCancelled = 0;
    this.dashboardService.getInvoiceStatusCircleChart(this.currentBusinessTeamCVRNumber, start, end).subscribe((response) => {
      response.data.forEach((item) => {
        switch (item.status){
          case 'CONFIRMED':
            totalConfirmed = item.totalInvoices;
            break;
          case 'OVERDUE':
            totalOverdue = item.totalInvoices;
            break;
          case 'PAID':
            totalPaid = item.totalInvoices;
            break;
          case 'OVERPAID':
            totalOverpaid = item.totalInvoices;
            break;
          case 'CANCELLED':
            totalCancelled = item.totalInvoices;
            break;
        }
        this.circleOneHasData = totalConfirmed > 0 || totalOverdue > 0 || totalPaid > 0 || totalOverpaid > 0 || totalCancelled > 0;
        this.circleOneData = {
          labels: ['Confirmed', 'Overdue', 'Paid', 'Overpaid', 'Cancelled'],
          datasets: [
            {
              data: [totalConfirmed, totalOverdue, totalPaid, totalOverpaid, totalCancelled],
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--gray-400')]
            }
          ]
        };
      });
    });
  }

  getTotalProducts(){
    this.dashboardService.getTotalProducts(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.totalProducts = response.data.totalProducts;
    });
  }

  getTotalUsers(){
    this.dashboardService.getTotalUsers(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.totalUsers = response.data.totalUsers;
    });
  }

  getTotalInvoices(){
    this.dashboardService.getTotalInvoices(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.totalInvoices = response.data.totalInvoices;
    });
  }

}
