import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OAuth2Service } from './../services/o-auth2.service';

/**
 * Se encarga de autorizar el acceso a las páginas de la app únicamente a los usuarios
 * autenticados. Se configura en combinación con el atributo 'canActivate' del módulo
 * de enrutamiento. Si el usuario no está autenticado redirige a la ruta de login definida
 * en environment.common
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private oAuthService: OAuth2Service
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.oAuthService.isUserAuthenticated()) {
          return true;
        } else {
          // not logged in so redirect to login page with the return url
          this.router.navigate([environment.common.loginRoute], { queryParams: { redirect: state.url }, replaceUrl: true });
          return false;
        }
    }
}
