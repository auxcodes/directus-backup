import { Injectable } from '@angular/core';
import DirectusSDK, { LoginCredentials } from '@directus/sdk-js';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client: DirectusSDK = new DirectusSDK({
    url: '',
    project: '',
    storage: sessionStorage
});
isCmsReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

constructor(private authService: AuthenticationService) {
}

async login(credentials: LoginCredentials) {
    this.authService.login(this.client, credentials).then(() => this.isCmsReady.next(this.client.loggedIn));
}

logout() {
    this.authService.logout(this.client);
}
}
