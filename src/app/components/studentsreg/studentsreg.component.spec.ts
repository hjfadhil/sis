import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsregComponent } from './studentsreg.component';

describe('StudentsregComponent', () => {
  let component: StudentsregComponent;
  let fixture: ComponentFixture<StudentsregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
