import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent6Component } from './selstudent6.component';

describe('Selstudent6Component', () => {
  let component: Selstudent6Component;
  let fixture: ComponentFixture<Selstudent6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
