import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BusinessTeamResponse} from "../../../models";
import {SalesApiService} from "../sales.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceResponse} from "../../../models/Invoice/invoice.models";
import {MenuItem} from "primeng/api";
import {MenuModule} from "primeng/menu";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Validations} from "../../../@shared/validations";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MenubarModule} from "primeng/menubar";


@Component({
  selector: 'app-invoice-display',
  standalone: true,
  imports: [CommonModule, MenuModule, BreadcrumbModule, FontAwesomeModule, MenubarModule],
  providers: [DatePipe],
  templateUrl: './invoice-display.component.html',
  styleUrl: './invoice-display.component.css'
})
export class InvoiceDisplayComponent implements OnInit {

  faFileInvoiceDollar = faFileInvoiceDollar;
  currentBusinessObject: BusinessTeamResponse = {} as BusinessTeamResponse;
  invoice: InvoiceResponse = {} as InvoiceResponse;
  invoiceNumber: number = 0;
  items: MenuItem[] | undefined;
  menuItems: MenuItem[] | undefined;

  constructor(private salesService: SalesApiService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router) {

  }

  ngOnInit(): void {
    this.currentBusinessObject = this.getBusinessTeam();
    this.invoiceNumber = Number(this.route.snapshot.paramMap.get('invoiceId'));
    this.getInvoice(this.invoiceNumber);
    this.items = [{label: 'Sales', routerLink: '/sales'}, {label: `Invoice ${this.invoiceNumber}`, routerLink: `/sales/invoice/${this.invoiceNumber}`}];
    this.menuItems = [
      {
        label: 'Print',
        icon: 'pi pi-fw pi-file',
        command: () => {
          this.printPdf();
        }
      },
      {
        label: 'Download',
        icon: 'pi pi-fw pi-download',
        command: () => {
          this.downloadPdf();
        }
      },
      {
        label: 'open',
        icon: 'pi pi-fw pi-external-link',
        command: () => {
          this.openPdf();
        }
      },
      {
        label: 'Close',
        icon: 'pi pi-fw pi-times',
        command: () => {
          this.navigateBackToSales();
        }
      }
    ];
  }

  getBusinessTeam() {
    let businessJson = localStorage.getItem('current_business_team');
    if (businessJson) {
      this.currentBusinessObject = JSON.parse(businessJson);
    }
    return this.currentBusinessObject;
  }

  getInvoice(invoiceNumber: number) {
    this.salesService.getInvoice(invoiceNumber).subscribe((response: any) => {
      this.invoice = response.data;
    });
  }

  navigateBackToSales() {
    this.router.navigate(['/sales/']);
  }

  downloadPdf() {
    const data = document.getElementById('invoice_print') as HTMLElement;
    html2canvas(data).then(canvas => {

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      let imgWidth = pdfWidth - 20;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = (imgHeight * canvas.width) / canvas.height;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`invoice_${this.invoiceNumber}_${this.invoice.contact.companyName.replace(" ","_")}.pdf`);
    });
  }

  openPdf() {
    const data = document.getElementById('invoice_print') as HTMLElement;
    html2canvas(data).then(canvas => {

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      let imgWidth = pdfWidth - 20;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = (imgHeight * canvas.width) / canvas.height;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', x, y, imgWidth, imgHeight);

      const blob = pdf.output('blob');

      const objectUrl = URL.createObjectURL(blob);

      window.open(objectUrl);
    });
  }

  printPdf() {
    const data = document.getElementById('invoice_print') as HTMLElement;
    html2canvas(data).then(canvas => {

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      let imgWidth = pdfWidth - 20;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = (imgHeight * canvas.width) / canvas.height;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', x, y, imgWidth, imgHeight);

      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');
    });
  }

  protected readonly Validations = Validations;
  protected readonly Number = Number;
}
