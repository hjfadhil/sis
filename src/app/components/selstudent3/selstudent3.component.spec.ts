import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent3Component } from './selstudent3.component';

describe('Selstudent3Component', () => {
  let component: Selstudent3Component;
  let fixture: ComponentFixture<Selstudent3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
