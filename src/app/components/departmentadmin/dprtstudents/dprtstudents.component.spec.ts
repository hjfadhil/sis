import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprtstudentsComponent } from './dprtstudents.component';

describe('DprtstudentsComponent', () => {
  let component: DprtstudentsComponent;
  let fixture: ComponentFixture<DprtstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprtstudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DprtstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
