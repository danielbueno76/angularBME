import { ErrorsService } from './errors.service';
import { MensajesService } from './mensajes.service';
import { EmpleadosIntService } from './empleados-int.service';
import { Injectable } from '@angular/core';
import { Empleado } from '../model/empleado';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EmpleadosErrorType } from '../model/errors';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosMockService implements EmpleadosIntService {

//  private empleados: Empleado[] = [];

  private empleados: Empleado[] = [
    new Empleado('32452435H', 'Juan', 'Ruíz', 23),
    new Empleado('23452348T','Narco','Bollo',18),
    new Empleado('63653653E','Amaia','Valdemoro',29),
    new Empleado('76548766O','Enrique','Iglesias',87),
    new Empleado('34665434Y','Jesús','Tolondrón',45),
    new Empleado('23676546Q','Olga','Viza',56),
    new Empleado('09879876O','Josune','Goikoetxea',32),
  ];

 
  constructor(private mensajesService: MensajesService, private errorsService: ErrorsService) { 
  }

  insertaEmpleado(empleadoAInsertar: Empleado): Observable<Empleado> {
    if (this.empleados.some(empleado => empleado.cif == empleadoAInsertar.cif)) {
      return this.errorsService.throwError(EmpleadosErrorType.DUPLICATED, empleadoAInsertar);
    } else {
      let miEmpObservable = of(empleadoAInsertar);
      return miEmpObservable;
    }
  }

  getAllEmpleados(): Observable<Empleado[]> {
    this.mensajesService.addMensaje('Empleados recuperados');
    return of(this.empleados);
  }
  
  getEmpleado(cif: string): Observable<Empleado> {
    return of(Object.assign(new Empleado(), this.empleados.find(emp => emp.cif === cif)))
  }

  updateEmpleado (updatedEmpleado: Empleado): Observable<void> {
    return of(void 0);
  }

  private sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}
