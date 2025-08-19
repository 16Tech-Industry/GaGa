import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAdm } from './dash-adm';

describe('DashAdm', () => {
  let component: DashAdm;
  let fixture: ComponentFixture<DashAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAdm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
