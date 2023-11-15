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

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule,ChartModule,
    RouterModule.forRoot(routes)],
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
