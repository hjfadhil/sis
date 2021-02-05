import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent5Component } from './selstudent5.component';

describe('Selstudent5Component', () => {
  let component: Selstudent5Component;
  let fixture: ComponentFixture<Selstudent5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
