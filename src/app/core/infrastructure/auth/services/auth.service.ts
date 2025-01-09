import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig, microsoftAuthConfig } from '../configs/auth.config';
import { AuthProvider } from '../../../../shared/enums/auth-provider.enum';
import { AuthServiceInterface } from '../../../domain/services/auth-service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {

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

  login(authProvider: AuthProvider): void {
    this.initializeAuth(authProvider);
    this.oauthService.initLoginFlow();
  }

  hasValidAccessToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  logout(): void {
    this.oauthService.revokeTokenAndLogout();
  }

  get userProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";

    return this.httpClient.get(url, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    });
  }

}
