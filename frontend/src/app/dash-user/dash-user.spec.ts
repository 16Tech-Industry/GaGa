import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUser } from './dash-user';

describe('DashUser', () => {
  let component: DashUser;
  let fixture: ComponentFixture<DashUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
