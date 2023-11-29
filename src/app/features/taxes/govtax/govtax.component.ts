import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-govtax',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './govtax.component.html',
  styleUrl: './govtax.component.css'
})
export class GovtaxComponent implements OnInit {

  faPercent = faPercent;

  constructor() {
  }

  ngOnInit(): void {
  }
}
