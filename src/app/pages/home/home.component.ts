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
  status: string = 'pending';
  loggedInUser: User;
  sponsors: Array<Sponsor>;
  contests: Array<Contest> = [];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    responsive: {
      300: {
        items: 1
      },
      576: {
        items: 2
      },
      978: {
        items: 3
      },
      1024: {
        items: 4
      }
    },
    nav: true
  }

  listStudent: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    responsive: {
      300: {
        items: 1
      },
      576: {
        items: 2
      },
      978: {
        items: 3
      },
      1024: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private contestService: ContestService) { }

  ngOnInit(): void {
    this.contestService.getWhereStatus(1).subscribe(res => {
      if (res.status == true) {
        this.contests = res.payload;
        if (this.contests) {
          this.status = 'done'
        }
      }

    });

    console.log(this.status);
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