import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { BusinessTeamRequest, RegisterRequest } from "../../../models";
import { MessageService } from "primeng/api";
import { ToastrService } from "ngx-toastr";
import {TeamManagementApiService} from "../../../features/team-management/team-management.api.service";

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
    website: '',
    ownerEmail: this.userEmail
  };


  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  openStep2: boolean = false;
  openStep3: boolean = false;


  constructor(private router: Router, private authService: AuthService,
             private toast: ToastrService, private teamService: TeamManagementApiService) {
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
    this.authService.registerUser(this.registerRequest).subscribe((data) => {
      this.showSuccessMessage = data.message;
      this.businessTeamRequest.CVRNumber = this.CVRNumber;
      this.businessTeamRequest.VATNumber = this.VATNumber;
      this.businessTeamRequest.companyName = this.companyName;
      this.businessTeamRequest.address = this.address;
      this.businessTeamRequest.city = this.city;
      this.businessTeamRequest.zipCode = this.zipCode;
      this.businessTeamRequest.country = this.country;
      this.businessTeamRequest.phoneNumber = this.phoneNumber;
      this.businessTeamRequest.email = this.companyEmail;
      this.businessTeamRequest.website = this.website;
      this.businessTeamRequest.ownerEmail = this.userEmail;
      this.teamService.createBusinessTeam(this.businessTeamRequest).subscribe((data) => {
        this.toast.success("You have successfully registered.");
        this.navigateToLogin();
      }, (error) => {
        this.toast.error("Something went wrong.");
      });
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
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
