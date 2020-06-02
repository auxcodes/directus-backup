import { Injectable } from '@angular/core';
import DirectusSDK, { LoginCredentials, ClientOptions } from '@directus/sdk-js';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { PageStateService } from '../page-state.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  downloadClient: DirectusSDK = new DirectusSDK({ url: '', project: '', storage: sessionStorage });
  uploadClient: DirectusSDK = new DirectusSDK({ url: '', project: '', storage: sessionStorage });

  downloadReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  uploadReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthenticationService,
    private stateService: PageStateService
  ) {
  }

  async downloadLogin(options: ClientOptions, credentials: LoginCredentials) {
    this.downloadClient = new DirectusSDK(options);
    this.authService.login(this.downloadClient, credentials).then(() => this.downloadReady.next(this.downloadClient.loggedIn));
  }

  async uploadLogin(options: ClientOptions, credentials: LoginCredentials) {
    this.uploadClient = new DirectusSDK(options);
    this.authService.login(this.uploadClient, credentials).then(() => this.uploadReady.next(this.uploadClient.loggedIn));
  }

  downloadLogout() {
    this.authService.logout(this.downloadClient);
    this.downloadReady.next(false);
  }

  uploadLogout() {
    this.authService.logout(this.uploadClient);
    this.uploadReady.next(false);
  }

  client(): DirectusSDK {
    if (this.stateService.currentTab.value === 'download') {
      return this.downloadClient;
    }
    if (this.stateService.currentTab.value === 'upload') {
      return this.uploadClient;
    }
  }
}
