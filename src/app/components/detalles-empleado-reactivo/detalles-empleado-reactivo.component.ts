import { EmpleadosDelegateService } from './../../services/empleados-delegate.service';
import { EmpleadosRestService } from './../../services/empleados-rest.service';
import { IntercambioEmpleadosService } from './../../services/intercambio-empleados.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalles-empleado-reactivo',
  templateUrl: './detalles-empleado-reactivo.component.html',
  styleUrls: ['./detalles-empleado-reactivo.component.css']
})
export class DetallesEmpleadoReactivoComponent implements OnInit {

  private empleado: Empleado;
  empForm: FormGroup;

  private creandoEmpleado: boolean;

  constructor(
    private empleadosService: EmpleadosDelegateService,
    private route: ActivatedRoute,
    private intercambioEmpleadosService: IntercambioEmpleadosService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.empForm = this.createFormGroup();
  }

  /* Creación del FormGroup*/
  private createFormGroup(): FormGroup {
    return this.formBuilder.group(new Empleado());
  }

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
              this.updateFormFromModel();
              break;
          }
        }
      )
    );
  }

  private updateFormFromModel() {
    const form = this.empForm;
    form.setValue(this.empleado);
  }

  private getEmpleadoFromService() {
    // Recuperar el cif que se encuentra en la url
    // solicitar el empleado con dicho cif al servicio
    // asignarlo al atributo empleado
    const cif = this.route.snapshot.paramMap.get('cif');
    this.empleadosService.getEmpleado(cif)
      .subscribe(empleado => {
        this.empleado = empleado;
        this.updateFormFromModel();
      });
  }

  private updateModelFromForm() {
    const form = this.empForm.value;
    Object.assign(this.empleado, form);
    this.empleado.edad = +this.empleado.edad;
  }

  onGuardar() {
    this.updateModelFromForm();
    this.intercambioEmpleadosService.emiteNuevoEmpleado(this.empleado);
    this.creandoEmpleado = false;
  }

  onCerrar() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

  /* Métodos get de ayuda para acceso fácil desde el template */
  get cif() { return this.empForm.get('cif'); }
  get nombre() { return this.empForm.get('nombre'); }
  get apellidos() { return this.empForm.get('apellidos'); }
  get edad() { return this.empForm.get('edad'); }
}
