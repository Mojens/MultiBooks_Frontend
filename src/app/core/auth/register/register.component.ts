import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import {RegisterRequest} from "../../../models";
import {MenuItem, MessageService} from "primeng/api";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  providers: [MessageService],
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

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  openStep2: boolean = false;
  openStep3: boolean = false;


  constructor(private router: Router, private service: AuthService,
             private toast: ToastrService) {
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
      this.confirmPassword = '';
      this.password = '';
      this.email = '';
    });
  }

  goToStep2() {
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.openStep2 = true;
    this.openStep3 = false;
  }

  goToStep3() {
    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
    this.openStep2 = false;
    this.openStep3 = true;
  }

  goToStep1() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.openStep2 = false;
    this.openStep3 = false;
  }

}
