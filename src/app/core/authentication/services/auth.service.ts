import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from '../configs/google-auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient,
    private readonly oauthService: OAuthService) {
    this.cofigure();
  }

  cofigure() {
    this.oauthService.configure(googleAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  get isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  get userProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";

    return this.httpClient.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

}
