import { Empleado } from './../model/empleado';
import { Observable } from 'rxjs';

export interface EmpleadosIntService {

    getAllEmpleados(): Observable<Empleado[]>;

    insertaEmpleado(empleado: Empleado): Observable<Empleado>;

    getEmpleado(cif: string): Observable<Empleado>;

    updateEmpleado(empleado: Empleado): Observable<void>;

}