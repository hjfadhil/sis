import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentadminComponent } from './departmentadmin.component';

describe('DepartmentadminComponent', () => {
  let component: DepartmentadminComponent;
  let fixture: ComponentFixture<DepartmentadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
