import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientService } from '../../services/directus/client.service';
import { PageStateService } from '../../services/page-state.service';
import { LoginConfig } from '../../shared/interfaces/login-config';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  url: string;
  project: string;
  email: string;
  password: string;
  errorMsg: string;

  @Input() loginConfig: LoginConfig;
  @Output() loggedInConfig: EventEmitter<LoginConfig> = new EventEmitter();

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
    this.setLoginConfig();
  }

  setLoginConfig() {
    console.log('login config: ', this.loginConfig);
    this.url = this.loginConfig.url;
    this.project = this.loginConfig.project;
    this.email = this.loginConfig.email;
  }

  signIn() {
    if (this.stateService.currentTab.value === 'download') {
      this.clientService.downloadLogin(
        { url: this.url, project: this.project, storage: sessionStorage },
        { email: this.email, password: this.password }
      )
        .then(() => {
          this.password = '';
          this.loggedInConfig.emit({ url: this.url, project: this.project, email: this.email });
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
          this.loggedInConfig.emit({ url: this.url, project: this.project, email: this.email });
          console.log('upload logged in');
        })
        .catch(() => this.errorMsg = 'Upload login attempt was unsuccessful');
    }
  }

}
