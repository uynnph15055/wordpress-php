import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecruitmentComponent as RecruitmentModal } from 'src/app/modal/recruitment/recruitment.component';
import { RecruitmentListCompanyComponent as ModalListCompany } from 'src/app/modal/recruitment-list-company/recruitment-list-company.component';
import { CompanyService } from 'src/app/services/company.service';
import { Enterprise } from 'src/app/models/enterprise.model';
import { RecruitmentsService } from 'src/app/services/recruitments.service';
import { Recruitments } from 'src/app/models/recruitments.models';
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  companys: Array<Enterprise>;
  recruitments: Array<Recruitments>;

  // -------------
  statusCompany: boolean = false;
  statusRecruitments: boolean = false;

  constructor(public dialog: MatDialog, public companyService: CompanyService, public recruitmentService: RecruitmentsService) { }

  sliderRecruitment = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: '.slick-next', nextArrow: '.slick-prev',
    dots: true,
    autoplay: true,
  };

  // Config doanh nghiệp
  sliderCompany = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    prevArrow: '.slick-company-next', nextArrow: '.slick-company-prev',
  };

  sliderWordKey = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
  };

  ngOnInit(): void {
    this.getListCompany();
    this.getListRecruitment();
    this.openRecruitmentDetail(20);
    // this.openListCompanyRecruitment();
  }

  openRecruitmentDetail(rescruitment_id: number): void {
    this.dialog.open(RecruitmentModal, {
      // width: '500px',
      data: {
        rescruitment_id: rescruitment_id,
      }
    })
  }

  // Gọi tất cả các doanh nghiệp
  getListCompany() {
    this.companyService.getAllCompany().subscribe(res => {
      if (res.status) {
        this.companys = res.dataContest;
        setTimeout(() => {
          this.companys ? this.statusCompany = true : this.statusCompany;
        }, 2000);
      }
    })
  }

  getListRecruitment() {
    this.recruitmentService.getAllRecruitment().subscribe(res => {
      if (res.status) {
        this.recruitments = res.payload;
        setTimeout(() => {
          this.recruitments ? this.statusRecruitments = true : this.statusRecruitments;
        }, 3000);
      }
    })
  }
}
