import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuth2Service } from './../services/o-auth2.service';

/**
 * Clase que añade el token jwt a todas las llamadas http que se realicen con el usuario
 * autenticado. Está simplemente como ejemplo, no se usa realmente para nada.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private oAuth2Service: OAuth2Service) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.oAuth2Service.isUserAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.oAuth2Service.token}`
                }
            });
        }

        return next.handle(request);
    }
}
