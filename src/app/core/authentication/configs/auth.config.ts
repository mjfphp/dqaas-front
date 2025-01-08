import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../../environments/environment';

export const googleAuthConfig: AuthConfig = {
    issuer: environment.googleIssuer,
    clientId: environment.googleClientId,
    redirectUri: environment.redirectUri,
    logoutUrl: environment.redirectUri,
    strictDiscoveryDocumentValidation: environment.production,
    responseType: 'id_token token',
    scope: 'openid profile email',
    // dummyClientSecret: 'secret',
};

export const microsoftAuthConfig: AuthConfig = {
    issuer: environment.microsoftIssuer,
    clientId: environment.microsoftClientId,
    redirectUri: environment.redirectUri,
    logoutUrl: environment.redirectUri,
    strictDiscoveryDocumentValidation: environment.production,
    responseType: 'id_token token',
    scope: 'openid profile email offline_access'
    // dummyClientSecret: 'secret',
};