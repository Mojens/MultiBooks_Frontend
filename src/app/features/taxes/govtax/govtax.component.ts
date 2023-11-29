import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbModule} from "primeng/breadcrumb";
import { MenuItem } from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-govtax',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BreadcrumbModule],
  templateUrl: './govtax.component.html',
  styleUrl: './govtax.component.css'
})
export class GovtaxComponent implements OnInit {

  faPercent = faPercent;
  items: MenuItem[] | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.items = [{ label: 'Tax', routerLink: '/taxes' }, { label: 'Government Tax',routerLink:'/taxes/govtax' }];
  }
}
