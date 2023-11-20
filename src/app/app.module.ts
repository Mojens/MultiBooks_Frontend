import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import {ToastModule} from "primeng/toast";


@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, ChartModule, SidebarModule,
    DividerModule, RippleModule, TooltipModule, ToastModule,
    ButtonModule, BrowserAnimationsModule,
    RouterModule.forRoot(routes), FontAwesomeModule],
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
