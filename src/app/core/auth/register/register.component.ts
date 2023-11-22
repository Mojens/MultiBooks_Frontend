import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { BusinessTeamRequest, RegisterRequest } from "../../../models";
import { MessageService } from "primeng/api";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register',
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  userEmail: string = '';
  password: string = '';
  confirmPassword: string = '';
  showSuccessMessage: string = '';
  registerRequest: RegisterRequest = {
    email: '',
    password: '',
    confirmPassword: ''
  };


  CVRNumber: number = 0;
  VATNumber: string = '';
  companyName: string = '';
  address: string = '';
  city: string = '';
  zipCode: number = 0;
  country: string = '';
  phoneNumber: string = '';
  website: string = '';
  companyEmail: string = '';
  businessTeamRequest: BusinessTeamRequest = {
    CVRNumber: 0,
    VATNumber: '',
    companyName: '',
    address: '',
    city: '',
    zipCode: 0,
    country: '',
    phoneNumber: '',
    email: this.companyEmail,
    website: ''
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
    this.registerRequest.email = this.userEmail;
    this.registerRequest.password = this.password;
    this.registerRequest.confirmPassword = this.confirmPassword;
    this.service.registerUser(this.registerRequest).subscribe((data) => {
      this.showSuccessMessage = data.message;
      this.confirmPassword = '';
      this.password = '';
      this.userEmail = '';
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidCVR(cvr: number): boolean {
    return cvr.toString().length <= 8;
  }

  isValidVAT(vat: string): boolean {
    const vatRegex = /^DK\d{8}$/;
    return vatRegex.test(vat);
  }

  isValidPassword(password: string): boolean {
    // Example criteria: Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  goToStep2() {
    if (!this.isValidEmail(this.userEmail)) {
      this.toast.error("Invalid email address.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toast.error("Passwords do not match.");
      return;
    }

    if (!this.isValidPassword(this.password)) {
      this.toast.error("Password does not meet criteria: Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toast.error("Passwords do not match.");
      return;
    }

    // Proceed to Step 2
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.openStep2 = true;
    this.openStep3 = false;
  }

  goToStep3() {
    if (!this.isValidCVR(this.CVRNumber)) {
      this.toast.error("Invalid CVR number. It should be up to 8 digits long.");
      return;
    }

    if (!this.isValidVAT(this.VATNumber)) {
      this.toast.error("Invalid VAT number. Format should be DK followed by 8 digits.");
      return;
    }

    // Proceed to Step 3
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
