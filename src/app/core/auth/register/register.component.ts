import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import {RegisterRequest} from "../../../models";
import {MenuItem, MessageService} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  items: MenuItem[] | undefined;
  activeIndex: number = 0;

  isLinear = false;
  firstFormGroup: FormGroup | undefined;
  secondFormGroup: FormGroup | undefined;

  constructor(private router: Router, private service: AuthService,
             private toastr: ToastrService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
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
}
