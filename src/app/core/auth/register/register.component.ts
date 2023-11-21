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

  items: MenuItem[] | undefined;
  activeIndex: number = 0;

  constructor(private router: Router, private service: AuthService, private messageService: MessageService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
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
