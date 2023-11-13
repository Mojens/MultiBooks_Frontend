import { Routes } from '@angular/router';
import { LoginComponent } from "./core/auth/login/login.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
];
