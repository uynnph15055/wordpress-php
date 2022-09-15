import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { Enterprise } from 'src/app/models/enterprise.model';
import { RecruitmentsService } from 'src/app/services/recruitments.service';
import { Recruitments } from 'src/app/models/recruitments.models';
import { Slider } from 'src/app/models/slider.model';
import { RecruitmentSearchComponent } from 'src/app/modal/recruitment-search/recruitment-search.component';
import { Contest } from 'src/app/models/contest';
import { PayingLinks } from 'src/app/models/paying-links';
import { TransmitToPost } from 'src/app/models/transmit-to-post.models';
import { Skill } from 'src/app/models/skill.models';
import { ListPostService } from 'src/app/services/list-post.service';
import { Post } from 'src/app/models/post.model';
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  companys: Array<Enterprise>;
  recruitments: Array<Recruitments>;
  recruitmentsHot: Array<Recruitments>;
  recruitmentLinks: Array<PayingLinks>;
  cinfigData: TransmitToPost;
  listPostResult : Array<Post>;

  // -------------
  statusCompany: boolean = false;
  statusRecruitments: boolean = false;
  statusRecruitmentsHot: boolean = false;

  constructor(public dialog: MatDialog,
    public companyService: CompanyService,
    public recruitmentService: RecruitmentsService,
    public listPostService : ListPostService) { }

  recruitmentBanner = {
    "slidesToShow": 1, infinite: true, autoplay: true, arrows: true, prevArrow: '.banner-arrow-prev', nextArrow: '.banner-arrow-next', slidesToScroll: 1, fadeSpeed: 1000,
  };

  ngOnInit(): void {
    this.getListRecruitment('nolmal');
    this.getListRecruitmentHot('hot');
    this.getListPost();

     
  }

  // 
  getListPost() {
     this.listPostService.getPostWhereCate('post-contest').subscribe(res => {
      if(res.status){
        this.listPostResult = res.payload.data;
      }
    })

    
  }

  // List Recruitment
  getListRecruitment(url: string) {
    this.statusRecruitments = false;
    this.recruitmentService.getAllRecruitment(url).subscribe(res => {
      if (res.status) {
        this.recruitments = res.payload.data;
        this.recruitmentLinks = res.payload.links;
        this.recruitments ? this.statusRecruitments = true : this.statusRecruitments;
      }
    })
  }

  // Get listRecruitment
  getListRecruitmentHot(url: string) {
    this.recruitmentService.getAllRecruitment(url).subscribe(res => {
      if (res.status) {
        this.recruitmentsHot = res.payload.data;
        this.recruitmentsHot ? this.statusRecruitmentsHot = true : this.statusRecruitmentsHot;
      }
    })
  }

  // get skill limit
  getLimitSkill(arrSkill: Array<Skill>): Array<Skill> {
    let arrResult = arrSkill.filter((res, index) => {
      return index < 3;
    });

    return arrResult;
  }

  // Open form search modal
  openModalSearchRecruitment() {
    this.dialog.open(RecruitmentSearchComponent, {
      height: '450px',
      width: '600px',
    });
  }
}
