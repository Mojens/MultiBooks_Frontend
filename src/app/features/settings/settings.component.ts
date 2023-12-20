import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {SettingsApiService} from "./settings.api.service";
import {ConfirmationService} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BusinessTeamRequest, BusinessTeamResponse, UpdateUserRequest} from "../../models";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AuthService} from "../../core/auth/auth.service";
import {TeamManagementApiService} from "../team-management/team-management.api.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CardModule, FormsModule, ButtonModule, RippleModule, ConfirmDialogModule, ReactiveFormsModule, FormsModule,],
  providers: [ConfirmationService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  currentBusinessTeamCVRNumber: number = 0;
  businessTeamRequest!: BusinessTeamRequest;
  currentUserEmail: string = '';
  isTeamOwner: boolean = false;
  currentTeam!: BusinessTeamResponse;
  faGear = faGear;
  emailRequest: UpdateUserRequest = {
    oldEmail: '',
    newEmail: ''
  }

  constructor(private settingsService: SettingsApiService,
              private toast: ToastrService,
              private confirmationService: ConfirmationService,
              private route: Router,
              private authService: AuthService,
              private teamService: TeamManagementApiService) {
  }

  ngOnInit(): void {
    this.currentBusinessTeamCVRNumber = Number(this.teamService.getCurrentBusinessTeam().cvrnumber);
    this.currentUserEmail = localStorage.getItem('user_mail')||'';
    this.getBusinessTeam();
    this.getIsTeamOwner();
  }

  changeEmail() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change your email?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5 mt-2',
      rejectButtonStyleClass: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2',
      accept: () => {
        this.settingsService.updateUser(this.emailRequest).subscribe(
          (response) => {
            this.toast.success('Email changed successfully', 'Success');
            this.authService.logout();
            this.route.navigate(['/login']);
          },
          (error) => {
            this.toast.error('Something went wrong', 'Error');
          }
        )
      }
    });
  }

  getBusinessTeam() {
    this.teamService.getBusinessTeam(this.currentBusinessTeamCVRNumber).subscribe((response: any) => {
      this.currentTeam = response.data;
      this.businessTeamRequest = {
        CVRNumber: this.currentTeam.cvrnumber,
        VATNumber: this.currentTeam.vatnumber,
        companyName: this.currentTeam.companyName,
        address: this.currentTeam.address,
        city: this.currentTeam.city,
        zipCode: this.currentTeam.zipCode,
        country: this.currentTeam.country,
        phoneNumber: this.currentTeam.phoneNumber,
        email: this.currentTeam.email,
        website: this.currentTeam.website,
        ownerEmail: this.currentTeam.ownerEmail,
        accNumber: this.currentTeam.accNumber,
        regNumber: this.currentTeam.regNumber,
        bankName: this.currentTeam.bankName
      }
    });
  }

  getIsTeamOwner() {
    this.settingsService.isTeamOwner(this.currentBusinessTeamCVRNumber).subscribe((response: any) => {
      this.isTeamOwner = response.data;
      console.log(this.isTeamOwner);
    });
  }
  changeTeamInfo() {
    this.teamService.editBusinessTeam(this.businessTeamRequest).subscribe((response: any) => {
      this.toast.success('Team info changed successfully', 'Success');
      localStorage.setItem('current_business_team', JSON.stringify(response.data));
      this.getBusinessTeam();
    });
  }
}
