import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientService } from '../../services/directus/client.service';
import { PageStateService } from '../../services/page-state.service';
import { ProjectContentService } from '../../services/project-content.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  url: string = 'https://ec2-52-12-61-199.us-west-2.compute.amazonaws.com';
  project: string = 'rca';
  email: string = 'borgosity@gmail.com';
  password: string;
  errorMsg: string;

  constructor(
    private clientService: ClientService,
    private titleService: Title,
    private stateService: PageStateService) {

  }

  ngOnInit() {
    if (this.stateService.currentTab.value === 'download') {
      this.clientService.downloadLogout();
    }
    if (this.stateService.currentTab.value === 'upload') {
      this.clientService.uploadLogout();
    }
    this.titleService.setTitle('Login');
  }

  signIn() {
    if (this.stateService.currentTab.value === 'download') {
      this.clientService.downloadLogin(
        { url: this.url, project: this.project, storage: sessionStorage },
        { email: this.email, password: this.password }
      )
        .then(() => {
          this.password = '';
          console.log('download logged in');
        })
        .catch(() => this.errorMsg = 'Download login attempt was unsuccessful');
    }
    if (this.stateService.currentTab.value === 'upload') {
      this.clientService.uploadLogin(
        { url: this.url, project: this.project, storage: sessionStorage },
        { email: this.email, password: this.password }
      )
        .then(() => {
          this.password = '';
          console.log('upload logged in');
        })
        .catch(() => this.errorMsg = 'Upload login attempt was unsuccessful');
    }
  }

}
