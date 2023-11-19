import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-forgot-pwd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-pwd.component.html',
  styleUrl: './forgot-pwd.component.css'
})
export class ForgotPwdComponent implements OnInit {

  email: string = '';
  message:string = '';
  messageTwo:string = '';
  errorMessage: string = '';

  constructor(private router: Router, private service: AuthService) { }
  ngOnInit(): void {
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  forgotPwd() {
    this.message = '';
    this.errorMessage = '';

    this.service.forgotPwd(this.email).subscribe(
      (data) => {
        this.message = data.message.split('-')[0];
        this.messageTwo = data.message.split('-')[1];
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

}
