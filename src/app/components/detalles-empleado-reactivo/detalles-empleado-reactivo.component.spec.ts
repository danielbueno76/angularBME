import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEmpleadoReactivoComponent } from './detalles-empleado-reactivo.component';

describe('DetallesEmpleadoReactivoComponent', () => {
  let component: DetallesEmpleadoReactivoComponent;
  let fixture: ComponentFixture<DetallesEmpleadoReactivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesEmpleadoReactivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEmpleadoReactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
