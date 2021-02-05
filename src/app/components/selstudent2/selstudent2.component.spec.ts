import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selstudent2Component } from './selstudent2.component';

describe('Selstudent2Component', () => {
  let component: Selstudent2Component;
  let fixture: ComponentFixture<Selstudent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Selstudent2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Selstudent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
