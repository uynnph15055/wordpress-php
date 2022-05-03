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


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: Array<User>;
  statusContest: string = 'pending';
  loggedInUser: User;
  sponsors: Array<Sponsor>;
  contests: Array<Contest> = [];
  item: Contest;

  sliderContest = { "slidesToShow": 4, infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', dots: true, nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000 };

  sliderStudentPointHight = { "slidesToShow": 3, prevArrow: '.prev-student-arrow', autoplay: true, nextArrow: '.next-student-arrow', slidesToScroll: 1, fadeSpeed: 3000, dots: true, centerMode: true };

  sliderAssessCompacity = { "slidesToShow": 1, prevArrow: '.prev-compacity-arrow', nextArrow: '.next-compacity-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true, };

  constructor(private contestService: ContestService, private configView: ConfigViewService) { }

  ngOnInit(): void {
    let elToShow = document.querySelectorAll('.show-on-scroll')
    this.contestService.getWhereStatus(1).subscribe(res => {
      if (res.status == true) {
        this.contests = res.payload.data;
        if (this.contests) {
          // console.log(this.contests);
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
  }

  // Kiểm tra người dùng đã login chưa 
  checkLogin(): boolean {
    return this.loggedInUser.id !== undefined
  }


}
