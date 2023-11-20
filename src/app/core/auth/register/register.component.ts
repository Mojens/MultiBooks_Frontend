import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import {RegisterRequest} from "../../../models";
import {StepsModule} from "primeng/steps";
import {MenuItem, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, StepsModule, ToastModule],
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

  constructor(private router: Router, private service: AuthService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Personal',
        command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
        label: 'Seat',
        command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
      },
      {
        label: 'Payment',
        command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
      },
      {
        label: 'Confirmation',
        command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
      }
    ];
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
