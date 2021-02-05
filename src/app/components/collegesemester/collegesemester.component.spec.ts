import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegesemesterComponent } from './collegesemester.component';

describe('CollegesemesterComponent', () => {
  let component: CollegesemesterComponent;
  let fixture: ComponentFixture<CollegesemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegesemesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegesemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
