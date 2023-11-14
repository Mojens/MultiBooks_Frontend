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
  showSidebar: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    if(router.config[2].path == 'login'){
      this.showSidebar = false;
    }else{
      this.showSidebar = true;
    }
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (!this.token) {
      this.router.navigate(["/login"]);
      this.showSidebar = false;
    }
    if(this.router.config[2].path == 'login'){
      this.showSidebar = false;
    }else{
      this.showSidebar = true;
    }
  }

}
