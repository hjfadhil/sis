import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent9Component } from './selstudent9.component';

describe('Selstudent9Component', () => {
  let component: Selstudent9Component;
  let fixture: ComponentFixture<Selstudent9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
