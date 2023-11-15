import { Routes } from '@angular/router';
import { LoginComponent } from "./core/auth/login/login.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import {ErrorComponent} from "./core/error/error.component";
import {SalesComponent} from "./features/sales/sales.component";
import {AccountingComponent} from "./features/accounting/accounting.component";
import {ContactsComponent} from "./features/contacts/contacts.component";
import {TaxesComponent} from "./features/taxes/taxes.component";
import {VatComponent} from "./features/taxes/vat/vat.component";
import {GovtaxComponent} from "./features/taxes/govtax/govtax.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {ForgotPwdComponent} from "./core/auth/forgot-pwd/forgot-pwd.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SalesComponent},
  { path: 'accounting', component: AccountingComponent},
  { path: 'contacts', component: ContactsComponent },
  { path: 'taxes', component: TaxesComponent},
  { path: 'taxes/vat', component: VatComponent},
  { path: 'taxes/govtax', component: GovtaxComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'registerr', component: ForgotPwdComponent},





  { path: '**', component: ErrorComponent},
];
