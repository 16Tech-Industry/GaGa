import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empresa } from './empresa';

describe('Empresa', () => {
  let component: Empresa;
  let fixture: ComponentFixture<Empresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Empresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
