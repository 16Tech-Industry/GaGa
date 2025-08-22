import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRegistro } from './formulario-registro';

describe('FormularioRegistro', () => {
  let component: FormularioRegistro;
  let fixture: ComponentFixture<FormularioRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRegistro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRegistro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
