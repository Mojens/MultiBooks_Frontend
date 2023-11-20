import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }
  login()
  {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.data.token);
        localStorage.setItem('user_information', response.data.email)
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
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
