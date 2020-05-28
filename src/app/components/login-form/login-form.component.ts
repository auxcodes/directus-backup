import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import DirectusSDK from '@directus/sdk-js';
import { ClientService } from '../../services/directus/client.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  client: DirectusSDK = new DirectusSDK({
    url: '',
    project: ''
  });

  email: string;
  password: string;
  errorMsg: string;

  constructor(private ngZone: NgZone,
    private clientService: ClientService,
    private router: Router,
    private titleService: Title) {

  }

  ngOnInit() {
    this.clientService.logout();
    this.titleService.setTitle('Login');
  }

  signIn() {
    this.clientService.login({ email: this.email, password: this.password })
      .then(() => {
        this.password = '';
        this.navigate(['/admin/#/login']);
      })
      .catch(error => {
        this.errorMsg = 'Admin login attempt was unsuccessful';
      });
  }

  navigate(commands: any[]) {
    this.ngZone.run(() => this.router.navigate(commands))
      .then()
      .catch(error => console.error('Admin login: ', error.msg));
  }

}
