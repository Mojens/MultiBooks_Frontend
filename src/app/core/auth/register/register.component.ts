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

  formData = {
    userEmail: '',
    password: '',
    confirmPassword: '',
    CVRNumber: 0,
    VATNumber: '',
    companyName: '',
    address: '',
    city: '',
    zipCode: 0,
    country: '',
    phoneNumber: '',
    website: '',
    companyEmail: ''
  };


  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;


  constructor(private router: Router, private authService: AuthService,
             private toast: ToastrService, private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    const registerRequest: RegisterRequest = {
      email: this.formData.userEmail,
      password: this.formData.password,
      confirmPassword: this.formData.confirmPassword
    };
    const businessTeamRequest: BusinessTeamRequest = {
      ...this.formData,
      ownerEmail: this.formData.userEmail,
      email: this.formData.companyEmail
    };

    this.authService.registerUser(registerRequest).subscribe(() => {
      this.teamService.createBusinessTeam(businessTeamRequest).subscribe(() => {
        this.toast.success("You have successfully registered.");
        this.navigateToLogin();
      }, () => this.toast.error("Error creating business team."));
    }, () => this.toast.error("Error registering user."));
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
    if (!this.isValidEmail(this.formData.userEmail)) {
      this.toast.error("Invalid email address.");
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.toast.error("Passwords do not match.");
      return;
    }

    if (!this.isValidPassword(this.formData.password)) {
      this.toast.error("Password does not meet criteria: Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.toast.error("Passwords do not match.");
      return;
    }

    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
  }

  goToStep3() {
    if (!this.isValidCVR(this.formData.CVRNumber)) {
      this.toast.error("Invalid CVR number. It should be up to 8 digits long.");
      return;
    }

    if (!this.isValidVAT(this.formData.VATNumber)) {
      this.toast.error("Invalid VAT number. Format should be DK followed by 8 digits.");
      return;
    }

    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
  }

  goToStep1() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }

}
