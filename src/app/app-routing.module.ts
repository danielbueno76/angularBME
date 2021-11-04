import { DetallesEmpleadoComponent } from './components/detalles-empleado/detalles-empleado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { LoginComponent } from './security/components/login/login.component';
import { DetallesEmpleadoReactivoComponent } from './components/detalles-empleado-reactivo/detalles-empleado-reactivo.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'listaEmpleados', component: ListaEmpleadosComponent,
    children: [
      { path: 'detalles/:cif', component: DetallesEmpleadoReactivoComponent  },
      { path: 'nuevo', component: DetallesEmpleadoReactivoComponent  },
    ]
  },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'detalles/:cif', component: DetallesEmpleadoReactivoComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
