import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentListCompanyComponent } from './recruitment-list-company.component';

describe('RecruitmentListCompanyComponent', () => {
  let component: RecruitmentListCompanyComponent;
  let fixture: ComponentFixture<RecruitmentListCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentListCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentListCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
