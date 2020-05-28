import { Injectable } from '@angular/core';
import DirectusSDK, { LoginCredentials } from '@directus/sdk-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  async login(client: DirectusSDK, options: LoginCredentials) {
    try {
      return client.login(options);
    }
    catch (error) {
      console.error('Unable to login to CMS: ', error);
    }
  }

  async signIn(client: DirectusSDK, options: LoginCredentials) {
    try {
      return client.login(options);
    }
    catch (error) {
      console.error('Unable to login to CMS: ', error);
    }
  }

  logout(client: DirectusSDK) {
    client.logout();
  }
}
