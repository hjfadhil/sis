import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent10Component } from './selstudent10.component';

describe('Selstudent10Component', () => {
  let component: Selstudent10Component;
  let fixture: ComponentFixture<Selstudent10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
