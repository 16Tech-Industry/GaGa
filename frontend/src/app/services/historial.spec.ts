import { TestBed } from '@angular/core/testing';

import { Historial } from './historial';

describe('Historial', () => {
  let service: Historial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Historial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
