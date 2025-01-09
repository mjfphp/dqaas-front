import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let oauthServiceMock: jest.Mocked<OAuthService>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    oauthServiceMock = {
      configure: jest.fn(),
      loadDiscoveryDocumentAndTryLogin: jest.fn(),
      initLoginFlow: jest.fn(),
      hasValidAccessToken: jest.fn(),
      getAccessToken: jest.fn(),
      revokeTokenAndLogout: jest.fn(),
    } as unknown as jest.Mocked<OAuthService>;

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: OAuthService, useValue: oauthServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});