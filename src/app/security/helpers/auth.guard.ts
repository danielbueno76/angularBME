import { AuthenticationService } from './../services/authentication.service';

import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { environment } from 'src/environments/environment';



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

        private authenticationService: AuthenticationService

    ) { }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authenticationService.isUserAuthenticated()) {

            // logged in so return true

            return true;

        }



        // not logged in so redirect to login page with the return url

        this.router.navigate([environment.common.loginRoute], { queryParams: { returnUrl: state.url } });

        return false;

    }

}