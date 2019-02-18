import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './app.auth-config';

declare var require: any;
const jwtDecode = require('jwt-decode');


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService
  ) {
    this.initializeApp();
    this.configureWithNewConfigApi();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // TODO Later:
    // this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.subscribe(e => {
      console.log('*** oauth/oidc event', e);
    });

    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  get isLoggedIn() {
    return this.oauthService.hasValidIdToken();
  }

  public get userName() {

    if (!this.isLoggedIn) {
      return '?';
    }

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return '?';
    }

    return claims['preferred_username'];
  }

  public get isAllowed() {
    if (this.isLoggedIn) {

      const token = this.oauthService.getAccessToken();
      const extraClaims = jwtDecode(token);
      const roles = extraClaims &&
        extraClaims.realm_access &&
        extraClaims.realm_access.roles;

      if (roles && roles.length && roles.indexOf('promt-user') > -1) {
        return true;
      }
    }

    return false;
  }
}
