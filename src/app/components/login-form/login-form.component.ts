import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientService } from '../../services/directus/client.service';
import { PageStateService } from '../../services/page-state.service';
import { LoginConfig } from '../../shared/interfaces/login-config';
import { DataType } from '../../shared/enums/data-type.enum';

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
  loggedIn = false;
  serverType = 'download';

  @Input() loginConfig: LoginConfig;
  @Output() loggedInConfig: EventEmitter<LoginConfig> = new EventEmitter();
  @Output() loggedOut: EventEmitter<boolean> = new EventEmitter(); 

  constructor(
    private clientService: ClientService,
    private titleService: Title,
    private stateService: PageStateService) {

  }

  ngOnInit() {
    if (this.loginConfig.server === DataType.Download) {
      this.clientService.downloadLogout();
      this.clientService.downloadReady.subscribe(ready => {
        this.loggedIn = ready;
      });
    }
    if (this.loginConfig.server === DataType.Upload) {
      this.clientService.uploadLogout();
      this.clientService.uploadReady.subscribe(ready => {
        this.loggedIn = ready;
      });
    }
    this.serverType = this.loginConfig.server === DataType.Download ? 'download.' : 'upload.';
    this.setLoginConfig();
  }

  setLoginConfig() {
    this.url = this.loginConfig.url;
    this.project = this.loginConfig.project;
    this.email = this.loginConfig.email;
  }

  signIn() {
    this.clientService.login(
      { url: this.url, project: this.project, storage: sessionStorage },
      { email: this.email, password: this.password },
      this.loginConfig.server
    )
      .then(() => {
        this.password = '';
        this.loggedInConfig.emit({ url: this.url, project: this.project, email: this.email, server: this.loginConfig.server });
      })
      .catch(() => this.errorMsg = 'Login attempt was unsuccessful');
  }

  onLogout() {
    this.loggedOut.emit(true);
    this.titleService.setTitle('Login');
  }

}
