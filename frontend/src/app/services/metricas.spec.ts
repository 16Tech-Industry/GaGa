import { TestBed } from '@angular/core/testing';

import { Metricas } from './metricas';

describe('Metricas', () => {
  let service: Metricas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Metricas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
