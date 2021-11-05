import { ErrorsService } from './errors.service';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { EmpleadosIntService } from './empleados-int.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosRestService implements EmpleadosIntService {

  private EMPLEADOS_SERVICE_URL = environment.common.empleadosServiceUrl;

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService) { }

  getAllEmpleadosReactivo(): Observable<Empleado> {
    return new Observable<Empleado>((observer) => {
      let url = this.EMPLEADOS_SERVICE_URL + 'reactive';
      let eventSource = new EventSource(url);
      eventSource.onmessage = (event) => {
        console.debug('Received event: ', event);
        let empleadoRecibido = Object.assign(new Empleado(), JSON.parse(event.data));
        observer.next(empleadoRecibido);
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way 
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        if(eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    });
  }

  getAllEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.EMPLEADOS_SERVICE_URL);
  }

  insertaEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<any>(this.EMPLEADOS_SERVICE_URL, empleado).pipe(
      catchError(error => this.errorsService.parseAndThrowError(error, empleado)),
      map(() => Object.assign(new Empleado(), empleado))
    );
  }
  
  getEmpleado(cif: string): Observable<Empleado> {
    return this.http.get<Empleado>(this.EMPLEADOS_SERVICE_URL + cif);
  }

  updateEmpleado (updatedEmpleado: Empleado): Observable<void> {
    const url = `${this.EMPLEADOS_SERVICE_URL}/${updatedEmpleado.cif}`;
    return this.http.put(url, updatedEmpleado, { responseType: 'text'}).pipe(
      map(() => void 0)
    );
  }

}
