import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../../environments/environment';

export const googleAuthConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: environment.googleIssuer,

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: environment.googleClientId,

    // URL of the SPA to redirect the user to after login
    redirectUri: environment.redirectUri,

    strictDiscoveryDocumentValidation: environment.production,

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'id_token token',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: 'openid profile email',

    // customQueryParams: {
    //     prompt: 'login'
    // },

};