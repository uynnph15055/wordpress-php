import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/models/sponsor';
import { User } from 'src/app/models/user';
import { SponsorService } from 'src/app/services/sponsor.service';
import { UserService } from 'src/app/services/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Contest } from 'src/app/models/contest';
import { Team } from 'src/app/models/team';
import { ContestService } from 'src/app/services/contest.service';
import { ConfigViewService } from 'src/app/services/config-view.service';
import { Major } from 'src/app/models/major';
import { MajorService } from 'src/app/services/major.service';
import { ResultRound } from 'src/app/models/result-round.model';
import { ResultMajor } from 'src/app/models/result-major.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  statusResultMajor: boolean = false;
  users: Array<User>;
  statusContest: string = 'pending';
  loggedInUser: User;
  sponsors: Array<Sponsor>;
  contests: Array<Contest> = [];
  item: Contest;
  majors: Array<Major>;
  resultMajor: Array<ResultMajor>;
  nameSelectMajor: any = 'Cơ khí';

  sliderContest = { "slidesToShow": 4, infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000 };

  sliderStudentPointHight = { "slidesToShow": 3, prevArrow: '.prev-student-arrow', autoplay: true, nextArrow: '.next-student-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true };

  sliderAssessCompacity = { "slidesToShow": 1, prevArrow: '.prev-compacity-arrow', nextArrow: '.next-compacity-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true, };

  constructor(private contestService: ContestService,
    private configView: ConfigViewService,
    private majorService: MajorService) { }

  ngOnInit(): void {
    let elToShow = document.querySelectorAll('.show-on-scroll')
    this.contestService.getWhereStatus(1).subscribe(res => {
      if (res.status == true) {
        this.contests = res.payload.data;
        if (this.contests) {
          this.statusContest = 'done'
        }
      }
    })
    // console.log(this.status);
    let studentStatistic = document.querySelector('.section_plan-student');
    let yearStatistic = document.querySelector('.section_plan-year');
    let passStatistic = document.querySelector('.section_plan-pass');

    this.configView.activityStrollView(elToShow);

    this.configView.runStatisticHome(studentStatistic, 10);
    this.configView.runStatisticHome(yearStatistic, 4000);
    this.configView.runStatisticHome(passStatistic, 2000);

    // getAllMajor
    this.getAllMajor();
  }

  // Kiểm tra người dùng đã login chưa 
  checkLogin(): boolean {
    return this.loggedInUser.id !== undefined
  }

  //Lấy ra tất cả các chuyên ngành
  getAllMajor() {
    this.majorService.getAll().subscribe(res => {
      if (res.status) {
        this.majors = res.payload;
        let majorRandom = Math.floor(Math.random() * this.majors.length);
        this.nameSelectMajor = this.majors[majorRandom].name;
        this.getResultWhereMajor(this.majors[majorRandom].slug);
      }
    })
  }

  // Gọi kết quả theo chuyên ngành.
  getResultWhereMajor(majorSlug: any) {
    this.majorService.getResultWhereMajor('co-khi').subscribe(res => {
      if (res.status) {
        this.resultMajor = res.payload;
        this.nameSelectMajor = this.majors.map((item: any) => {
          if (item.slug == majorSlug) {
            return item.name;
          }
        })
        this.resultMajor ? this.statusResultMajor = true : this.statusResultMajor;
      }
    })
  }
}
