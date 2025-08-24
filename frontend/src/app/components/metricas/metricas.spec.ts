import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Metricas } from './metricas';

describe('Metricas', () => {
  let component: Metricas;
  let fixture: ComponentFixture<Metricas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Metricas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Metricas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
