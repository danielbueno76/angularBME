import { DetallesEmpleadoComponent } from './components/detalles-empleado/detalles-empleado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';

const routes: Routes = [
  { path: '', redirectTo: '/listaEmpleados', pathMatch: 'full'},
  { path: 'listaEmpleados', component: ListaEmpleadosComponent,
    children: [
      { path: 'detalles/:cif', component: DetallesEmpleadoComponent },
      { path: 'nuevo', component: DetallesEmpleadoComponent },
    ]
  },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'detalles/:cif', component: DetallesEmpleadoComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
