import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class OAuth2Service {

  private isAuthenticated: boolean = false;



  constructor(private oidcSecurityService: OidcSecurityService) {

    this.oidcSecurityService.isAuthenticated$.subscribe(

      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated

    );

  }



  isUserAuthenticated() {

    return this.isAuthenticated;

  }



  get token() {

    return this.oidcSecurityService.getToken();

  }



  get userData() {

    return this.oidcSecurityService.userData$;

  }



  checkAuth() {

    return this.oidcSecurityService.checkAuth();

  }



  doLogin() {

    return of(this.oidcSecurityService.authorize());

  }



  logout() {

    this.oidcSecurityService.logoff();

  }
}
