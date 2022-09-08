import { Component, OnInit, Input } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { Team } from 'src/app/models/team';
import * as moment from 'moment/moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contest-item',
  templateUrl: './contest-item.component.html',
  styleUrls: ['./contest-item.component.css']
})
export class ContestItemComponent implements OnInit {
  @Input() item: Contest;
  @Input() major_slug: any;
  @Input() pageContestByUser: boolean;
  date_end : number;
  date_start : number;
  date_register_start : number;
  date_register_end : number;
  today : number;
  disabled: boolean = true;

  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
     
      this.date_start = new Date(moment(this.item.register_deadline).format('lll')).getTime();
      this.date_register_start = new Date(moment(this.item.start_register_time).format('lll')).getTime();
      this.date_register_end = new Date(moment(this.item.end_register_time).format('lll')).getTime();
     
    
    setInterval(() => {
      this.date_end = new Date(moment(this.item.date_start).format('lll')).getTime();
      this.today = new Date().getTime();
      let distance =  this.date_register_end - this.today;
      this.date_register_start > this.today ? this.disabled = false : this.disabled;
    
      if (distance < 0 || this.item.status == 2 || this.date_register_start > this.today) {
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
    let totalMember = teams.length;
    return totalMember;
  }

  checkStatusContest(item: Contest): any {
    let result;
    let status;
    if (item.status <= 1) {
      if(this.date_register_start > this.today){
        result = 'Sắp diễn ra';
      }else if(this.date_register_end > this.today){
        result = 'Đang mở đăng ký';
      }else if(this.date_start > this.today){
        result = 'Đang đóng đăng ký';
      }else if(this.date_end > this.today){
        result = 'Đang diễn ra';
      }else{
        result = 'Đã diễn ra';
      }
    } else {
      result = 'Đã kết thúc';
    }
    return result;
  }
}
