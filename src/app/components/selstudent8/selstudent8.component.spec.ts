import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent8Component } from './selstudent8.component';

describe('Selstudent8Component', () => {
  let component: Selstudent8Component;
  let fixture: ComponentFixture<Selstudent8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
