import { AuthenticationService } from './../services/authentication.service';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';



/**

 * Clase que añade el token jwt a todas las llamadas http que se realicen con el usuario

 * autenticado. Está simplemente como ejemplo, no se usa realmente para nada.

 */

@Injectable()

export class JwtInterceptor implements HttpInterceptor {



    constructor(private authenticationService: AuthenticationService) { }



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available

        if (this.authenticationService.isUserAuthenticated) {

            request = request.clone({

                setHeaders: {

                    Authorization: `Bearer ${this.authenticationService.getCurrentUser().token}`

                }

            });

        }



        return next.handle(request);

    }

}