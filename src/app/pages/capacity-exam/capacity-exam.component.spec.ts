import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityExamComponent } from './capacity-exam.component';

describe('CapacityExamComponent', () => {
  let component: CapacityExamComponent;
  let fixture: ComponentFixture<CapacityExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
