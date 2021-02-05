import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegestudentsComponent } from './collegestudents.component';

describe('CollegestudentsComponent', () => {
  let component: CollegestudentsComponent;
  let fixture: ComponentFixture<CollegestudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegestudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegestudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
