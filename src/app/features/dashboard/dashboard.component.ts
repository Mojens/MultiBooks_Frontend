import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {faDashboard} from "@fortawesome/free-solid-svg-icons";
import {ChartModule} from 'primeng/chart';
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
import {Variables} from "../../@shared/variables";
import {Validations} from "../../@shared/validations";
import {InvoiceResponse} from "../../models/Invoice/invoice.models";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonModule, RippleModule, TableModule, ConfirmDialogModule, ChartModule, CardModule, DropdownModule, FormsModule, TooltipModule],
  providers: [DatePipe, MessageService, ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  faDashboard = faDashboard;
  currentBusinessTeamCVRNumber: number = 0;

  currentYear = new Date().getFullYear().toString();
  yearOptions: any[] = [];
  graphOneSelectedYear: any = {label: new Date().getFullYear().toString(), value: new Date().getFullYear().toString()};
  graphTwoSelectedYearOne: any = {
    label: (new Date().getFullYear()-1).toString(),
    value: (new Date().getFullYear()-1).toString()
  };
  graphTwoSelectedYearTwo: any = {
    label: new Date().getFullYear().toString(),
    value: new Date().getFullYear().toString()
  };
  circleOneSelectedYear: any = {label: new Date().getFullYear().toString(), value: new Date().getFullYear().toString()};

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

  selectedVatQuota: any = {label: 'Quarter 1', value: 'Quarter 1'};
  vatForQuota: number = 0;

  selectedStatus: any =  {label: 'Paid', value: 3};
  totalRecords: number = 0;
  rows: number = 5;
  currentPage: number = 0;
  invoices: InvoiceResponse[] = [];

  startVatDate: String = '';
  endVatDate: String = '';

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
    this.graphTwoOptions = graphTwoOptions;
    this.getTotalProducts();
    this.getTotalUsers();
    this.getTotalInvoices();
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00Z')?.split('+')[0] + 'Z';
  }

  graphOneYearChange(event: any) {
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
          labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
          datasets: [
            {
              label: `${chosenYear} Sales (Paid and overpaid invoices)`,
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

  circleOneYearChange(event: any) {
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
        switch (item.status) {
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

  getTotalProducts() {
    this.dashboardService.getTotalProducts(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.totalProducts = response.data.totalProducts;
    });
  }

  getTotalUsers() {
    this.dashboardService.getTotalUsers(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.totalUsers = response.data.totalUsers;
    });
  }

  getTotalInvoices() {
    this.dashboardService.getTotalInvoices(this.currentBusinessTeamCVRNumber).subscribe((response) => {
      this.totalInvoices = response.data.totalInvoices;
    });
  }

  compareCharts() {
    let chosenYearOne = Number(this.graphTwoSelectedYearOne.value);
    let chosenYearTwo = Number(this.graphTwoSelectedYearTwo.value);
    const firstDayOfYearOne = new Date(chosenYearOne, 0, 1);
    const lastDayOfYearOne = new Date(chosenYearOne, 11, 31);
    const startOne = this.formatDate(firstDayOfYearOne);
    const endOne = this.formatDate(lastDayOfYearOne);
    const firstDayOfYearTwo = new Date(chosenYearTwo, 0, 1);
    const lastDayOfYearTwo = new Date(chosenYearTwo, 11, 31);
    const startTwo = this.formatDate(firstDayOfYearTwo);
    const endTwo = this.formatDate(lastDayOfYearTwo);
    let firstTotalQuotaOne = 0;
    let firstTotalQuotaTwo = 0;
    let firstTotalQuotaThree = 0;
    let firstTotalQuotaFour = 0;
    let secondTotalQuotaOne = 0;
    let secondTotalQuotaTwo = 0;
    let secondTotalQuotaThree = 0;
    let secondTotalQuotaFour = 0;
    this.dashboardService.getSalesYearly(this.currentBusinessTeamCVRNumber, startOne, endOne).subscribe((response) => {
      response.data.forEach((item) => {
        switch (item.quarter) {
          case 'Q1':
            firstTotalQuotaOne = item.total;
            break;
          case 'Q2':
            firstTotalQuotaTwo = item.total;
            break;
          case 'Q3':
            firstTotalQuotaThree = item.total;
            break;
          case 'Q4':
            firstTotalQuotaFour = item.total;
            break;
        }
      });
      this.dashboardService.getSalesYearly(this.currentBusinessTeamCVRNumber, startTwo, endTwo).subscribe((response) => {
        response.data.forEach((item) => {
          switch (item.quarter) {
            case 'Q1':
              secondTotalQuotaOne = item.total;
              break;
            case 'Q2':
              secondTotalQuotaTwo = item.total;
              break;
            case 'Q3':
              secondTotalQuotaThree = item.total;
              break;
            case 'Q4':
              secondTotalQuotaFour = item.total;
              break;
          }
          this.graphTwoHasData = firstTotalQuotaOne > 0 || firstTotalQuotaTwo > 0 || firstTotalQuotaThree > 0 || firstTotalQuotaFour > 0 || secondTotalQuotaOne > 0 || secondTotalQuotaTwo > 0 || secondTotalQuotaThree > 0 || secondTotalQuotaFour > 0;
          this.graphTwoData = {
            labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
            datasets: [
              {
                label: `${chosenYearOne}`,
                data: [firstTotalQuotaOne, firstTotalQuotaTwo, firstTotalQuotaThree, firstTotalQuotaFour],
                backgroundColor: ['rgb(255, 159, 64)', 'rgb(255, 159, 64)', 'rgb(255, 159, 64)', 'rgb(255, 159, 64)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(255, 159, 64)', 'rgb(255, 159, 64)', 'rgb(255, 159, 64)'],
                borderWidth: 1
              },
              {
                label: `${chosenYearTwo}`,
                data: [secondTotalQuotaOne, secondTotalQuotaTwo, secondTotalQuotaThree, secondTotalQuotaFour],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 132)', 'rgb(255, 99, 132)', 'rgb(255, 99, 132)'],
                borderColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 132)', 'rgb(255, 99, 132)', 'rgb(255, 99, 132)'],
                borderWidth: 1
              }
            ]
          };
        });
      });
    });
  }

  onChangeVatQuota(event: any) {
    this.selectedVatQuota = event.value;
    let start =  this.formatDate(this.dashboardService.getQuarterDates(this.selectedVatQuota.value).start);
    let end =  this.formatDate(this.dashboardService.getQuarterDates(this.selectedVatQuota.value).end);

    this.startVatDate = this.datePipe.transform(start, 'dd-MM-yyyy')?.split('+')[0] + '';
    this.endVatDate = this.datePipe.transform(end, 'dd-MM-yyyy')?.split('+')[0] + '';

    this.dashboardService.getVatForQuarter(this.currentBusinessTeamCVRNumber, start, end).subscribe((response) => {
      this.vatForQuota = response.data.total;
    });

  }
  getInvoicesByStatus(event: any) {
    this.selectedStatus = event.value;
    this.getInvoices(this.selectedStatus.value, this.currentPage, this.rows);
  }
  onLazyLoad(event: any): void {
    this.currentPage = event.first / event.rows;
    this.getInvoices(this.selectedStatus.value, this.currentPage, this.rows);
  }
  getInvoices(statusCode: number, currentPage: number, rows: number) {
    this.dashboardService.getInvoicesByStatus(this.currentBusinessTeamCVRNumber, statusCode, currentPage, rows).subscribe((response: any) => {
      this.invoices = response.data.content;
      this.totalRecords = response.data.totalElements;
    });
  }

  protected readonly Variables = Variables;
  protected readonly Validations = Validations;
  protected readonly Number = Number;
}
