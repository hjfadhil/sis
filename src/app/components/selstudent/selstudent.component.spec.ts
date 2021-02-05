import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelstudentComponent } from './selstudent.component';

describe('SelstudentComponent', () => {
  let component: SelstudentComponent;
  let fixture: ComponentFixture<SelstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelstudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
