import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {TeamManagementApiService} from "../../../features/team-management/team-management.api.service";
import { ToastrService } from "ngx-toastr";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-login',
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private toast: ToastrService,
              private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }
  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.data.token);
        localStorage.setItem('user_mail', response.data.email.toLowerCase());
        window.location.href = `/team-management?userMail=${response.data.email.toLowerCase()}`;
      },
      (error) => {
        this.toast.error(error.error.message);
      }
    );
  }
  navigateToRegister()
  {
    this.router.navigate(['/register']);
  }
  navigateToForgotPassword()
  {
    this.router.navigate(['/forgot-password']);
  }
}
