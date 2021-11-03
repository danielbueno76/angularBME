import { EmpleadosDelegateService } from './../../services/empleados-delegate.service';
import { EmpleadosRestService } from './../../services/empleados-rest.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private empleados: Empleado[];

  constructor(private empleadosService: EmpleadosDelegateService) { }

  ngOnInit() {
    this.getEmpleadosFromService();
  }

  private getEmpleadosFromService() {
    this.empleadosService.getAllEmpleados().subscribe(
      empleados => this.empleados = empleados.slice(0, 4)
    )
  }

}
