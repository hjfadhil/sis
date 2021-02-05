import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collegeadmin3Component } from './collegeadmin3.component';

describe('Collegeadmin3Component', () => {
  let component: Collegeadmin3Component;
  let fixture: ComponentFixture<Collegeadmin3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Collegeadmin3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Collegeadmin3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
