import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeadminComponent } from './collegeadmin.component';

describe('CollegeadminComponent', () => {
  let component: CollegeadminComponent;
  let fixture: ComponentFixture<CollegeadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
