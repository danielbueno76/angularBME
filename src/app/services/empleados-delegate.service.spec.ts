import { TestBed } from '@angular/core/testing';

import { EmpleadosDelegateService } from './empleados-delegate.service';

describe('EmpleadosDelegateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpleadosDelegateService = TestBed.get(EmpleadosDelegateService);
    expect(service).toBeTruthy();
  });
});
