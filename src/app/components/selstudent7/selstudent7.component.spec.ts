import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent7Component } from './selstudent7.component';

describe('Selstudent7Component', () => {
  let component: Selstudent7Component;
  let fixture: ComponentFixture<Selstudent7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
