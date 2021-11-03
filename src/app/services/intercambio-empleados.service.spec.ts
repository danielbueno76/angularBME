import { TestBed } from '@angular/core/testing';

import { IntercambioEmpleadosService } from './intercambio-empleados.service';

describe('IntercambioEmpleadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntercambioEmpleadosService = TestBed.get(IntercambioEmpleadosService);
    expect(service).toBeTruthy();
  });
});
