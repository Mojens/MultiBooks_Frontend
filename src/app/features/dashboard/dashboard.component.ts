import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {faDashboard} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  faDashboard = faDashboard;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

}
