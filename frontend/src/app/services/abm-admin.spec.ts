import { TestBed } from '@angular/core/testing';

import { AbmAdmin } from './abm-admin';

describe('AbmAdmin', () => {
  let service: AbmAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbmAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
