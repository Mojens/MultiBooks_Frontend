import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  constructor(private route: Router,) {
  }

  navigateToDashboard() {
    this.route.navigate(['dashboard']);
  }
}
