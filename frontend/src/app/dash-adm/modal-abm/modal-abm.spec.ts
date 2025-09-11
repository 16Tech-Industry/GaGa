import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAbm } from './modal-abm';

describe('ModalAbm', () => {
  let component: ModalAbm;
  let fixture: ComponentFixture<ModalAbm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAbm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAbm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
