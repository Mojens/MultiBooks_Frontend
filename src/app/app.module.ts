import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {LoginComponent} from "./core/auth/login/login.component";
import {AuthService} from "./core/auth/auth.service";
import {routes} from "./app.routes";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import { ChartModule } from 'primeng/chart';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "primeng/tooltip";
import {ScrollTopModule} from "primeng/scrolltop";
import {RegisterComponent} from "./core/auth/register/register.component";
import {ToastrModule} from "ngx-toastr";
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from "@angular/material/form-field";
import {TeamManagementApiService} from "./features/team-management/team-management.api.service";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";



@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, ChartModule, SidebarModule,
    DividerModule, RippleModule, TooltipModule, ToastrModule.forRoot(), ScrollTopModule,
    ButtonModule, BrowserAnimationsModule, MatStepperModule, MatFormFieldModule, ReactiveFormsModule,
    RouterModule.forRoot(routes), FontAwesomeModule, ReactiveFormsModule, ConfirmDialogModule],
  declarations: [AppComponent, LoginComponent, DashboardComponent, RegisterComponent],
  providers: [AuthService, TeamManagementApiService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
