import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecruitmentComponent as RecruitmentModal } from 'src/app/modal/recruitment/recruitment.component';
import { CompanyService } from 'src/app/services/company.service';
import { Enterprise } from 'src/app/models/enterprise.model';
import { RecruitmentsService } from 'src/app/services/recruitments.service';
import { Recruitments } from 'src/app/models/recruitments.models';
import { Slider } from 'src/app/models/slider.model';
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

  sliderStudentPointHight = { "slidesToShow": 2, prevArrow: '.prev-student-arrow', nextArrow: '.next-student-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true };

  constructor(public dialog: MatDialog, public companyService: CompanyService, public recruitmentService: RecruitmentsService) { }

  // bannerSub: Array<any> = [
  //   {
  //     image_url: 'https://www.wework.com/ideas/wp-content/uploads/sites/4/2017/06/Web_150DPI-20190927_10th_Floor_Conference_Room_2_v1.jpg'
  //   },
  //   {
  //     image_url: 'https://daily.jstor.org/wp-content/uploads/2018/03/conference_room_talk_1050x700.jpg'
  //   },
  //   {
  //     image_url: 'https://www.sage.com/en-us/blog/wp-content/uploads/sites/2/2018/04/peoplecenteredworklplace.jpg'
  //   }
  // ];
  sliderPostNew = {
    "slidesToShow": 4, infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 586,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  recruitmentBanner = {
    "slidesToShow": 1, infinite: true, autoplay: true, arrows: true, prevArrow: '.banner-arrow-prev', nextArrow: '.banner-arrow-next', slidesToScroll: 1, fadeSpeed: 1000,
  };

  ngOnInit(): void {
    this.getListCompany();
    this.getListRecruitment();
    // this.openRecruitmentDetail(20);
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

        this.companys ? this.statusCompany = true : this.statusCompany;

      }
    })
  }

  getListRecruitment() {
    this.recruitmentService.getAllRecruitment().subscribe(res => {
      if (res.status) {
        this.recruitments = res.payload;

        this.recruitments ? this.statusRecruitments = true : this.statusRecruitments;

      }
    })
  }
}
