import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collegeadmin2Component } from './collegeadmin2.component';

describe('Collegeadmin2Component', () => {
  let component: Collegeadmin2Component;
  let fixture: ComponentFixture<Collegeadmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Collegeadmin2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Collegeadmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
