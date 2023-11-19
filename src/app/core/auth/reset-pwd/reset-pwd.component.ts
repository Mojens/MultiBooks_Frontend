import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-pwd',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.css'
})
export class ResetPwdComponent implements OnInit{

  resetToken: string = '';

  password: string = '';
  confirmPassword: string = '';

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit(): void {
   this.resetToken = this.route.snapshot.params['reset-token'];

  }

  resetPwd(){

  }
}
