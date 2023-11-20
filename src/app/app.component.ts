import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from "./core/auth/auth.service";
import {MenuItem} from 'primeng/api';
import {
  faHome,
  faDashboard,
  faDollarSign,
  faFileInvoiceDollar,
  faAddressBook,
  faPercent,
  faSignOut,
  faGear,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username: string | null = null;
  token: string | null = null;
  showSidebar: boolean = true;

  faHome = faHome;
  faAddressBook = faAddressBook;
  faPercent = faPercent;
  faSignOut = faSignOut;
  faGear = faGear;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faDollarSign = faDollarSign;
  faDashboard = faDashboard;
  faUsers = faUsers;


  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url.includes('/login') ||
          event.url.includes('/forgot-password') ||
          event.url.includes('/register') ||
          event.url.includes('/reset-password') ||
          event.url.includes('/team-management')
        ) {
          this.showSidebar = false;
        }
        if (
          event.url.includes('/login') ||
          event.url.includes('/forgot-password') ||
          event.url.includes('/register') ||
          event.url.includes('/reset-password') ||
          event.url.includes('/team-management')
        ) {
          document.getElementById('container_content_all')?.classList.add('p-0')
          document.getElementById('container_content_all')?.classList.remove('p-5')
        } else {
          this.showSidebar = true;
          document.getElementById('container_content_all')?.classList.remove('p-0')
          document.getElementById('container_content_all')?.classList.add('p-5')
        }
      }
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('user_information');
  }

  navigateToSales() {
    this.router.navigate(["/sales"]);
  }

  navigateToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  navigateToAccounting() {
    this.router.navigate(["/accounting"]);
  }

  navigateToContacts() {
    this.router.navigate(["/contacts"]);
  }

  navigateToTaxes() {
    this.router.navigate(["/taxes"]);
  }

  navigateToSettings() {
    this.router.navigate(["/settings"]);
  }

  navigateToTeamManagement() {
    this.router.navigate(["/team-management"]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
