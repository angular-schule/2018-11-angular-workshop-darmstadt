// auth.config.ts
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  loginUrl: 'https://angular-schule.eu.auth0.com/authorize',
  redirectUri: 'http://localhost:4200',
  clientId: 'myb1GOMpODqAaBnS51F9YWhzL13pSyfx',
  responseType: 'token',
  oidc: false,
  customQueryParams: {
    audience: 'https://api.angular.schule'
  }
};
