import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {AuthService} from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string | null = null;
  showSidebar: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url.includes('/login') ||
          event.url.includes('/forgot-password') ||
          event.url.includes('/register') ||
          event.url.includes('/reset-password')
        ) {
          this.showSidebar = false;
        }
        if (
          event.url.includes('/login') ||
          event.url.includes('/forgot-password') ||
          event.url.includes('/register') ||
          event.url.includes('/reset-password')
        ) {
          document.getElementById('container_content_all')?.classList.add('p-0')
          document.getElementById('container_content_all')?.classList.remove('p-5')
        }else{
          this.showSidebar = true;
          document.getElementById('container_content_all')?.classList.remove('p-0')
          document.getElementById('container_content_all')?.classList.add('p-5')
        }
      }
    });
  }

  ngOnInit(): void {
  }

  navigateToSales(){
    this.router.navigate(["/sales"]);
  }
  navigateToDashboard(){
    this.router.navigate(["/dashboard"]);
  }
  navigateToAccounting(){
    this.router.navigate(["/accounting"]);
  }
  navigateToContacts(){
    this.router.navigate(["/contacts"]);
  }
  navigateToTaxes(){
    this.router.navigate(["/taxes"]);
  }

}
