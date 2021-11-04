import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

import { mergeMap } from 'rxjs/operators';

import { User } from '../../model/user';



const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];



/**

 * Interceptor que simula el servidor de autenticación. Intercepta todas las llamadas

 * http que se producen desde la app y procesa las que terminan en /users/authenticate.

 * El procesamiento consiste en comprobar en cotejar el usuario y el password que envía

 * el cliente con el array de Users declarado más arriba. Si se encuentra el usuario se

 * devuelve junto con un jwt ficticio, si no se encuentra se devuelve un error.

 */

@Injectable()

export class FakeBackendInterceptor implements HttpInterceptor {



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;



        // wrap in delayed observable to simulate server api call

        return of(null)

            .pipe(mergeMap(handleRoute))

/*            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)

            .pipe(delay(500))

            .pipe(dematerialize())*/;



        function handleRoute() {

            switch (true) {

                case url.endsWith('/users/authenticate') && method === 'POST':

                    return authenticate();

                default:

                    // pass through any requests not handled above

                    return next.handle(request);

            }    

        }



        // route functions



        function authenticate() {

            const { username, password } = body;

            const user = users.find(x => x.username === username && x.password === password);

            if (!user) return error('Username or password is incorrect');

            return ok({

                id: user.id,

                username: user.username,

                firstName: user.firstName,

                lastName: user.lastName,

                token: 'fake-jwt-token'

            })

        }



        // helper functions



        function ok(body?) {

            return of(new HttpResponse({ status: 200, body }))

        }



        function error(message) {

            return throwError({ error: { message } });

        }



    }

}



export let fakeBackendProvider = {

    // use fake backend in place of Http service for backend-less development

    provide: HTTP_INTERCEPTORS,

    useClass: FakeBackendInterceptor,

    multi: true

};