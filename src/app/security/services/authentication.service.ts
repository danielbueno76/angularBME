import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

/**
 * Servicio de autenticación. El método login() envía petición de autenticación al
 * servicio correspondiente (de momento esta petición es interceptada y procesada
 * por el fake-backend). Si la respuesta es válida recupera el User del body, lo
 * inserta en localStorage (para mantenerlo en el navegador aunque cerremos éste) y
 * en el atributo currentUser y lo devuelve. Implementa métodos de logout y para
 * comprobar si el usuario está autenticado.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser: User = null;

  constructor(private http: HttpClient) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public getCurrentUser(): User {
      return this.currentUser;
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.common.authUrl}/users/authenticate`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUser = user;
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUser = null;
  }

  isUserAuthenticated(): boolean {
    if (this.currentUser && this.currentUser.token) {
      return true;
    } else {
      return false;
    }
  }
}
