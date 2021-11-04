import { EmpleadosMockService } from './services/empleados-mock.service';
import { EMPLEADOS_SERVICE } from './services/empleados-int.service';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    { provide: EMPLEADOS_SERVICE, useClass: EmpleadosMockService }
  ]
})
export class MockModule {

}
