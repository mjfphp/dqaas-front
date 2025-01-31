import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenServiceInterface } from '../../../domain/services/token-service.interface';
import { Observable } from 'rxjs';
import { JwtToken } from '../../../domain/types/jwt-token.type';
import { OAuthService } from 'angular-oauth2-oidc';
import { FirstConnection } from '../../../domain/types/first-connection.type';
import { LocalStorageServiceInterface } from '../../../../shared/local-storage/domain/services/local-storage.interface';
import { AUTH_PROVIDER } from '../../../domain/constants/storage.constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements TokenServiceInterface {

  constructor(private readonly _http: HttpClient,
    private readonly _oauthService: OAuthService,
    private readonly _localStorageServiceInterface: LocalStorageServiceInterface,
  ) { }

  generateJwtToken(firstConnection: FirstConnection): Observable<JwtToken> {
    const authProvider = this._localStorageServiceInterface.get(AUTH_PROVIDER) ?? '';

    return this._http.post<JwtToken>('/api/token', firstConnection, {
      headers: {
        Authorization: `Bearer ${this._oauthService.getAccessToken()}`,
        Provider: authProvider,
      }
    });
  }

}
