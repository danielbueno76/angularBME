import { ErrorsService } from './../../services/errors.service';
import { EmpleadosDelegateService } from './../../services/empleados-delegate.service';
import { EmpleadosRestService } from './../../services/empleados-rest.service';
import { IntercambioEmpleadosService } from './../../services/intercambio-empleados.service';
import { MensajesService } from './../../services/mensajes.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
  providers: []
})
export class ListaEmpleadosComponent implements OnInit {

  private empleados: Empleado[];
  private empleadoSeleccionado: Empleado;
  private contador = 0;

  constructor(
    private empleadosService: EmpleadosDelegateService,
    private mensajesService: MensajesService,
    private router: Router,
    private intercambioEmpleadosService: IntercambioEmpleadosService,
    private route: ActivatedRoute,
    private errorsService: ErrorsService
  ) { }

  ngOnInit() {
    this.intercambioEmpleadosService.getNuevoEmpleadoObservable()
      .subscribe(emp => this.empleadoRecibido(emp));
    this.getEmpleadosFromService();
  }

  private getEmpleadosFromService() {
    this.empleadosService.getAllEmpleados().subscribe(
      empleados => {
        this.empleados = empleados;
        const firstChild = this.route.snapshot.firstChild;
        if (firstChild) {
          const cif = firstChild.paramMap.get('cif');
          this.empleadoSeleccionado = this.empleados.find(empleado => empleado.cif === cif);
        }
      }
    );
  }

  muestraMensajeRecurrente() {
    console.log(++this.contador);
  }

  onSeleccionaEmpleado(empleado: Empleado) {
    this.mensajesService.addMensaje('Empleado con cif ' + empleado.cif + ' seleccionado');
    this.empleadoSeleccionado = empleado;
    this.router.navigate(['/listaEmpleados/detalles/' + empleado.cif]);
 //   this.intercambioEmpleadosService.emiteEmpleadoSeleccionado(empleado);
  }

  onNuevoEmpleado() {
    this.empleadoSeleccionado = new Empleado();
    this.router.navigate(['/listaEmpleados/nuevo/']);
  }

  empleadoRecibido(empleadoAGuardar: Empleado) {
    // ¿Estamos insertando o modificando?
    let index = this.router.url.indexOf('nuevo');
    if (index >= 0) {
      this.empleadosService.insertaEmpleado(empleadoAGuardar).subscribe(
        empleadoCreado => {
            this.empleados.push(empleadoCreado);
            this.mensajesService.addMensaje("Empleado con cif " + empleadoCreado.cif + " añadido");
            this.empleadoSeleccionado = empleadoCreado;
        },
        error => this.errorsService.handleError(error)
      );
    } else {
      this.empleadosService.updateEmpleado(empleadoAGuardar).subscribe(
        () => {
          let empleadoAModificar = 
              this.empleados.find(empleado => empleado.cif === empleadoAGuardar.cif);
          Object.assign(empleadoAModificar, empleadoAGuardar);
        }
      );
    }
  }
}
