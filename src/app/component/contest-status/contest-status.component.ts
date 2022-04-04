import { Component, OnInit, Input } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { Contest } from 'src/app/models/contest';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-contest-status',
  templateUrl: './contest-status.component.html',
  styleUrls: ['./contest-status.component.css']
})
export class ContestStatusComponent implements OnInit {
  @Input() contests: any;

  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;
  status: number = 1;

  x = setInterval(() => {
    let futureDate = new Date("Apr 30, 2022 15:24:35").getTime();
    let today = new Date().getTime();
    let distance = futureDate - today;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);

  constructor(private contestService: ContestService) { }

  ngOnInit(): void {
  }

  searchContest(e: any) {
    this.contestService.searchContest(e.target.value).subscribe(res => {
      if (res.status == true) {
        this.contests = res.payload;
      }
    })
    console.log(this.contests);
  }

  // Lọc theo trạng thái
  getContestStatus(status: number) {
    return this.contests.filter((item: any) => {
      return item.status == status;
    });
  }

  // Điểm số người tham gia
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
