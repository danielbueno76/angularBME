import { JwtInterceptor } from './security/helpers/jwt.interceptor';
import { fakeBackendProvider } from './security/helpers/fake-backend.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallesEmpleadoComponent } from './components/detalles-empleado/detalles-empleado.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetallesEmpleadoReactivoComponent } from './components/detalles-empleado-reactivo/detalles-empleado-reactivo.component';
import { SecurityModule } from './security/security.module';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadosComponent,
    DetallesEmpleadoComponent,
    MensajesComponent,
    DashboardComponent,
    DetallesEmpleadoReactivoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SecurityModule,
    environment.variableServicesModule
  ],
  providers: [fakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
