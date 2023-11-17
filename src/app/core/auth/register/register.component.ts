import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import {RegisterRequest} from "../../../models";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showSuccessMessage: string = '';
  request: RegisterRequest = {
    email: '',
    password: '',
    confirmPassword: ''
  };


  constructor(private router: Router, private service: AuthService) {
  }

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    this.request.email = this.email;
    this.request.password = this.password;
    this.request.confirmPassword = this.confirmPassword;
    this.service.registerUser(this.request).subscribe((data) => {
      this.showSuccessMessage = data.message;
    });
  }
}
