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
import { AuthGuard } from "./core/auth/authGuard";
import {ResetPwdComponent} from "./core/auth/reset-pwd/reset-pwd.component";
import {TeamManagementComponent} from "./features/team-management/team-management.component";
import {SettingsComponent} from "./features/settings/settings.component";
import {ProductComponent} from "./features/sales/product/product.component";
import {CreateSalesComponent} from "./features/sales/create-sales/create-sales.component";
import {CreateProductComponent} from "./features/sales/product/create-product/create-product.component";
import {EditProductComponent} from "./features/sales/product/edit-product/edit-product.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'accounting', component: AccountingComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'taxes', component: TaxesComponent, canActivate: [AuthGuard] },
  { path: 'taxes/vat', component: VatComponent, canActivate: [AuthGuard] },
  { path: 'taxes/govtax', component: GovtaxComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPwdComponent},
  { path: 'reset-password/:reset-token', component: ResetPwdComponent},
  { path: 'team-management', component: TeamManagementComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'sales/product',component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'sales/product/create', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'sales/product/edit/:productId', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'sales/create/:invoiceId', component: CreateSalesComponent, canActivate: [AuthGuard] },






  { path: '**', component: ErrorComponent},
];
