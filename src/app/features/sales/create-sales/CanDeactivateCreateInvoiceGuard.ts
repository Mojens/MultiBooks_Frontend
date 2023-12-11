import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { CreateSalesComponent } from './create-sales.component';
import {SalesApiService} from "../sales.api.service";
@Injectable({
  providedIn: 'root',
})
export class CanDeactivateCreateInvoiceGuard
  implements CanDeactivate<CreateSalesComponent>
{
  constructor(private confirmationService: ConfirmationService,
              private service: SalesApiService) {}

  canDeactivate(
    component: CreateSalesComponent
  ): boolean | Observable<boolean> {
    let invoiceId = component.invoiceNumber;
    if (component.hasUnsavedChanges()) {
      return new Observable<boolean>((observer) => {
        this.confirmationService.confirm({
          message: 'Are you sure you want to leave the page?',
          header: 'Confirm to leave',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Yes',
          rejectLabel: 'No',
          acceptButtonStyleClass:
            'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5',
          rejectButtonStyleClass:
            'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
          accept: () => {
            observer.next(true);
            observer.complete();
            this.service.deleteInvoice(invoiceId).subscribe();
          },
          reject: () => {
            observer.next(false);
            observer.complete();
          },
        });
      });
    }
    return true;
  }
}
