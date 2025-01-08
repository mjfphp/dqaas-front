import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig, microsoftAuthConfig } from '../configs/auth.config';
import { AuthProvider } from '../../../shared/enums/auth-provider.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient,
    private readonly oauthService: OAuthService) {
    this.initializeAuth(AuthProvider.Google);
  }

  initializeAuth(authProvider: AuthProvider) {
    // Dynamically configure OAuthService based on the chosen provider
    if (authProvider === AuthProvider.Google) {
      this.oauthService.configure(googleAuthConfig);
    } else if (authProvider === AuthProvider.Microsoft) {
      this.oauthService.configure(microsoftAuthConfig);
    }

    // Load discovery document and attempt login
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginGoogle() {
    this.initializeAuth(AuthProvider.Google);
    this.oauthService.initLoginFlow();
  }

  loginMicrosoft() {
    this.initializeAuth(AuthProvider.Microsoft);
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
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
