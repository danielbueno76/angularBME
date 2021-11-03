import { DetallesEmpleadoComponent } from './components/detalles-empleado/detalles-empleado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { LoginComponent } from './security/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
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
