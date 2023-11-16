import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

    email: string = '';
    password: string = '';
    message:string = '';

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    navigateToLogin() {
      this.router.navigate(['/login']);
    }

    register() {
      this.message = 'Registering...';
    }
}
