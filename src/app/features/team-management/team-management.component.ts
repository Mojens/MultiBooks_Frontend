import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {TeamManagementApiService} from "./team-management.api.service";
import {BusinessTeamRequest, BusinessTeamResponse} from "../../models";
import {TooltipModule} from "primeng/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Validations} from "../../@shared/validations";

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule, AvatarModule, AvatarGroupModule, TooltipModule, ReactiveFormsModule, FormsModule],
  providers: [MessageService],
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.css'
})
export class TeamManagementComponent implements OnInit {

  userMail: string = '';
  userBusinessTeams: BusinessTeamResponse[] = [];
  createMode: boolean = false;

  formData = {
    CVRNumber: 0,
    VATNumber: '',
    companyName: '',
    address: '',
    city: '',
    zipCode: 0,
    country: '',
    phoneNumber: '',
    website: '',
    companyEmail: '',
    accNumber: '',
    regNumber: 0,
    bankName: ''
  };

  constructor(private route: ActivatedRoute,
              private toast: ToastrService,
              private teamService: TeamManagementApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['userMail']) {
        this.userMail = params['userMail'];
      } else {
        this.userMail = localStorage.getItem('user_mail') || ''
      }
    });
    this.teamService.getUserBusinessTeam(this.userMail).subscribe(
      (response) => {
        this.userBusinessTeams = response.data;
        localStorage.setItem('user_business_teams', JSON.stringify(response.data))
      },
      (error) => {
        this.toast.error(error.error.message);
      }
    );
  }

  setTeam(team: BusinessTeamResponse) {
    localStorage.setItem('current_business_team', JSON.stringify(team));
    this.router.navigate(['dashboard'], {queryParams: {team: team.cvrnumber}});
  }

  goBack() {
    const team = JSON.parse(localStorage.getItem('current_business_team') || '{}');
    this.router.navigate(['dashboard'], {queryParams: {team: team.cvrnumber}});
  }

  setCreateMode() {
    this.createMode = !this.createMode;
  }

  onCreateTeam() {
    const request: BusinessTeamRequest = {
      ...this.formData,
      email: this.formData.companyEmail,
      ownerEmail: this.userMail
    }
    this.validateData();
    let validForm = this.validForm();
    if (validForm) {
      this.teamService.createBusinessTeam(request).subscribe(
        (response) => {
          this.toast.success('Successfully created business team');
          this.userBusinessTeams.push(response.data);
          this.setCreateMode();
        },
        (error) => {
          this.toast.error(error.error.message);
        }
      );
    }
  }

  validateData() {
    if (!Validations.isValidEmail(this.formData.companyEmail)) {
      this.toast.error("Invalid email address.");
      return;
    }
    if (!Validations.isValidVAT(this.formData.VATNumber)) {
      this.toast.error("Invalid VAT number.");
      return;
    }
    if (!Validations.isValidCVR(this.formData.CVRNumber)) {
      this.toast.error("Invalid CVR number.");
      return;
    }
  }

  validForm() {
    if (this.formData.regNumber == 0) {
      this.toast.error("Invalid reg number.");
      return false;
    } else if (this.formData.CVRNumber == 0 || this.formData.CVRNumber.toString().length != 8 || !Validations.isValidCVR(this.formData.CVRNumber)) {
      this.toast.error("Invalid CVR number.");
      return false;
    } else if (!Validations.isValidVAT(this.formData.VATNumber)) {
      this.toast.error("Invalid VAT number.");
      return false;
    } else if (this.formData.companyName == '') {
      this.toast.error("Invalid company name.");
      return false;
    } else if (this.formData.address == '') {
      this.toast.error("Invalid address.");
      return false;
    } else if (this.formData.city == '') {
      this.toast.error("Invalid city.");
      return false;
    } else if (this.formData.zipCode == 0) {
      this.toast.error("Invalid zip code.");
      return false;
    } else if (this.formData.country == '') {
      this.toast.error("Invalid country.");
      return false;
    } else if (this.formData.phoneNumber == '') {
      this.toast.error("Invalid phone number.");
      return false;
    } else if (this.formData.website == '') {
      this.toast.error("Invalid website.");
      return false;
    } else if (this.formData.companyEmail == '' || !Validations.isValidEmail(this.formData.companyEmail)) {
      this.toast.error("Invalid company email.");
      return false;
    }
    return true;
  }

  protected readonly localStorage = localStorage;
}
