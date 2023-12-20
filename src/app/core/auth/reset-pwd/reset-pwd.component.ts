import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {ResetPwdRequest} from "../../../models";

@Component({
  selector: 'app-reset-pwd',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.css'
})
export class ResetPwdComponent implements OnInit {

  resetToken: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  request: ResetPwdRequest = {
    resetToken: '',
    password: '',
    confirmPassword: ''
  };


  constructor(private route: ActivatedRoute, private service: AuthService, private router: Router) {
  }


  ngOnInit(): void {
    this.resetToken = this.route.snapshot.params['reset-token'];
    this.verifyToken();
  }

  resetPwd() {
    this.request.confirmPassword = this.confirmPassword;
    this.request.password = this.password;
    this.request.resetToken = this.resetToken;
    this.service.resetPwd(this.request).subscribe((data) => {
      this.router.navigate(['/login']);
    }, (error) => {
      this.errorMessage = error.error.message;
    });
  }

  verifyToken() {
    this.service.verifyResetToken(this.resetToken).subscribe((res) => {
    }, (error) => {
      this.errorMessage = error.error.message;
    })
  }
  navigateToForgotPwd() {
    this.router.navigate(['/forgot-password']);
  }
}
