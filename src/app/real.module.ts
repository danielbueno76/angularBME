import { EMPLEADOS_SERVICE } from './services/empleados-int.service';
import { NgModule } from '@angular/core';
import { EmpleadosRestService } from './services/empleados-rest.service';

@NgModule({
  providers: [
    { provide: EMPLEADOS_SERVICE, useClass: EmpleadosRestService }
  ]
})
export class RealModule {

}
