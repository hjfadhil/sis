import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent4Component } from './selstudent4.component';

describe('Selstudent4Component', () => {
  let component: Selstudent4Component;
  let fixture: ComponentFixture<Selstudent4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
