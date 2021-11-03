import { EmpleadosDelegateService } from './../../services/empleados-delegate.service';
import { EmpleadosRestService } from './../../services/empleados-rest.service';
import { IntercambioEmpleadosService } from './../../services/intercambio-empleados.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalles-empleado',
  templateUrl: './detalles-empleado.component.html',
  styleUrls: ['./detalles-empleado.component.css']
})
export class DetallesEmpleadoComponent implements OnInit {

  private empleado: Empleado;

  private creandoEmpleado: boolean;

  constructor(
    private empleadosService: EmpleadosDelegateService,
    private route: ActivatedRoute,
    private intercambioEmpleadosService: IntercambioEmpleadosService,
    private router: Router
  ) { }

  ngOnInit() {
    // Comprobar la ruta de petición. Si es /detalle hacer this.getEmpleado,
    // si es /nuevoEmpleado hacer un new sobre this.empleado
    // Al subscribirnos a la url el callback es invocado cuando ésta cambia,
    // por lo que ahora sí se actualiza el empleado a mostrar aunque
    // el componente no se redibuje, por lo que podemos prescindir del
    // Observable de notificación de nueva selección en el padre.
    // No es necesario desubscribirse de Observables proporcionados por
    // ActivatedRoute (ver https://angular.io/guide/router)
    this.route.url.subscribe(
      segments => segments.forEach(
        segment => {
          switch (segment.path) {

            case 'detalles':
              this.creandoEmpleado = false;
              this.getEmpleadoFromService();
              break;

            case 'nuevo':
              this.creandoEmpleado = true;
              this.empleado = new Empleado();
              break;
          }
        }
      )
    );
  }

  private getEmpleadoFromService() {
    // Recuperar el cif que se encuentra en la url
    // solicitar el empleado con dicho cif al servicio
    // asignarlo al atributo empleado
    const cif = this.route.snapshot.paramMap.get('cif');
    this.empleadosService.getEmpleado(cif)
      .subscribe(empleado => this.empleado = empleado);
  }

  onGuardar() {
    this.empleado.edad = +this.empleado.edad;
    this.intercambioEmpleadosService.emiteNuevoEmpleado(this.empleado);
    this.creandoEmpleado = false;
  }

  onCerrar() {
    this.router.navigate([ '../..' ], { relativeTo: this.route });
  }

  onCancelar() {
    this.getEmpleadoFromService();
  }
}
