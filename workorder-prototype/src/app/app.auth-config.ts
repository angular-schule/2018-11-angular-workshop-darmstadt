import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: environment.AUTH_ISSUER_URL,

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + window.location.pathname,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'angular-promt',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

  // URL of the SPA to redirect the user after silent refresh
  // TODO
  // silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
};
