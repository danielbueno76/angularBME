import { Empleado } from './../model/empleado';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercambioEmpleadosService {

  private nuevoEmpleadoSource = new Subject<Empleado>();

  constructor() { }

  emiteNuevoEmpleado(empleado: Empleado) {
    this.nuevoEmpleadoSource.next(empleado);
  }

  getNuevoEmpleadoObservable(): Observable<Empleado> {
    return this.nuevoEmpleadoSource.asObservable();
  }

}
