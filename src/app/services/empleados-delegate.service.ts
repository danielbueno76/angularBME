import { EmpleadosRestService } from './empleados-rest.service';
import { EmpleadosMockService } from './empleados-mock.service';
import { EmpleadosIntService } from './empleados-int.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosDelegateService implements EmpleadosIntService {

  constructor(private empleadosService: EmpleadosMockService) { }
  getAllEmpleados(): Observable<Empleado[]> {
    return this.empleadosService.getAllEmpleados();
  }

  insertaEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.empleadosService.insertaEmpleado(empleado);
  }

  getEmpleado(cif: string): Observable<Empleado> {
    return this.empleadosService.getEmpleado(cif);
  }

  updateEmpleado(empleado: Empleado): Observable<void> {
    return this.empleadosService.updateEmpleado(empleado);
  }

}
