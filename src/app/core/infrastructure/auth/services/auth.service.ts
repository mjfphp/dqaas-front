import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthProvider } from '../enums/auth-provider.enum';
import { googleAuthConfig, microsoftAuthConfig } from '../configs/auth.config';
import { AuthServiceInterface } from '../../../domain/services/auth-service.interface';
import { LocalStorageServiceInterface } from '../../../../shared/local-storage/domain/services/local-storage.interface';
import { AUTH_PROVIDER, JWT_TOKEN_KEY } from '../../../domain/constants/storage.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {

  constructor(private readonly _httpClient: HttpClient,
    private readonly _oauthService: OAuthService,
    private readonly _localStorageServiceInterface: LocalStorageServiceInterface,
  ) {
    this.initializeAuth(AuthProvider.Google);
  }

  initializeAuth(authProvider: AuthProvider) {
    // Dynamically configure OAuthService based on the chosen provider
    if (authProvider === AuthProvider.Google) {
      this._oauthService.configure(googleAuthConfig);
    } else if (authProvider === AuthProvider.Microsoft) {
      this._oauthService.configure(microsoftAuthConfig);
    }

    // Load discovery document and attempt login
    this._oauthService.setupAutomaticSilentRefresh();
    this._oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(authProvider: AuthProvider): void {
    // Initialize the auth configuration based on the selected provider
    this.initializeAuth(authProvider);

    // Save the selected auth provider in local storage
    this._localStorageServiceInterface.set(AUTH_PROVIDER, authProvider);

    // Initiate the login flow
    this._oauthService.initLoginFlow();
  }

  hasValidAccessToken(): boolean {
    return this._oauthService.hasValidAccessToken();
  }

  getAccessToken(): string {
    return this._oauthService.getAccessToken();
  }

  logout(): void {
    // Remove the selected auth provider and the JWT token from local storage
    this._localStorageServiceInterface.remove(AUTH_PROVIDER);
    this._localStorageServiceInterface.remove(JWT_TOKEN_KEY);

    // Logout from the OAuthService
    if (this.hasValidAccessToken()) {
      this._oauthService.revokeTokenAndLogout();
    } else {
      this._oauthService.logOut();
    }
  }

  get userProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";

    return this._httpClient.get(url, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    });
  }

}
