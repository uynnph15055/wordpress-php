import { Component, OnInit, Input } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { Team } from 'src/app/models/team';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-contest-item',
  templateUrl: './contest-item.component.html',
  styleUrls: ['./contest-item.component.css']
})
export class ContestItemComponent implements OnInit {
  @Input() item: Contest;
  @Input() major_slug: any;
  @Input() pageContestByUser: boolean;

  checkStatusDate: boolean = true;
  nameButton: string = 'Đăng ký';
  statusContest: number;
  date_end: string;
  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;


  constructor() { }

  ngOnInit(): void {

    this.date_end = moment(this.item.register_deadline).format('lll');
    setInterval(() => {

      let futureDate = new Date(this.date_end).getTime();
      let today = new Date().getTime();

      let distance = futureDate - today;
      if (distance < 0) {
        this.checkStatusDate = false;
        this.nameButton = 'Đã hết hạn'
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
      } else {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

  // Điếm số thành viên và đội tham gia 
  getMembers(teams: Array<Team> = []): number {
    let totalMember = 0;
    teams.forEach(t => {
      if (t.members != undefined) {
        totalMember += t.members.length;
      }
    });
    return totalMember;
  }

  checkStatusContest(start_time: Date, end_time: Date, id_round: number): any {
    let result;
    let startTime = new Date(start_time).getTime();
    let endTime = new Date(end_time).getTime();
    let todayTime = new Date().getTime();


    if (todayTime > endTime) {
      this.statusContest = 1;
      result = 'Đã hết bạn';
    } else if (startTime < todayTime && todayTime < endTime) {
      this.statusContest = 2;
      result = 'Đang mở';
    } else if (todayTime < endTime) {
      this.statusContest = 3;
      result = 'Sắp mở';
    }

    return result;
  }


}
