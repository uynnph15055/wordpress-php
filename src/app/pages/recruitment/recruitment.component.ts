import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecruitmentComponent as RecruitmentModal } from 'src/app/modal/recruitment/recruitment.component';
import { RecruitmentListCompanyComponent as ModalListCompany } from 'src/app/modal/recruitment-list-company/recruitment-list-company.component';
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

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
    // this.openRecruitmentDetail();
    this.openListCompanyRecruitment();
  }

  openListCompanyRecruitment(): void {
    this.dialog.open(ModalListCompany, {
      width: '500px',
    })
  }


 
}
