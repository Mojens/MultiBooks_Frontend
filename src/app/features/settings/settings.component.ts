import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
  faGear = faGear;
  constructor() {}

  ngOnInit(): void {
  }
}
