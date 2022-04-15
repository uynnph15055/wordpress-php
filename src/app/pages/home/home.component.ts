import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/models/sponsor';
import { User } from 'src/app/models/user';
import { SponsorService } from 'src/app/services/sponsor.service';
import { UserService } from 'src/app/services/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Contest } from 'src/app/models/contest';
import { Team } from 'src/app/models/team';
import { ContestService } from 'src/app/services/contest.service';


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


  sliderContest = { "slidesToShow": 4, dots: true, infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000 };

  sliderStudentPointHight = { "slidesToShow": 3, prevArrow: '.prev-student-arrow', autoplay: true, nextArrow: '.next-student-arrow', slidesToScroll: 1, dots: true, fadeSpeed: 3000, centerMode: true, };


  sliderAssessCompacity = { "slidesToShow": 1, prevArrow: '.prev-compacity-arrow', nextArrow: '.next-compacity-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true, };

  constructor(private contestService: ContestService) { }

  ngOnInit(): void {
    this.contestService.getWhereStatus(1).subscribe(res => {
      if (res.status == true) {
        this.contests = res.payload;
        if (this.contests) {
          this.statusContest = 'done'
        }
      }
    })
    // console.log(this.status);

  }

  checkLogin(): boolean {
    return this.loggedInUser.id !== undefined
  }

  getMembers(teams: Array<Team> = []): number {
    let totalMember = 0;
    teams.forEach(t => {
      if (t.members != undefined) {
        totalMember += t.members.length;
      }
    });
    return totalMember;
  }
}
