import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-contest-detail-header-right',
  templateUrl: './contest-detail-header-right.component.html',
  styleUrls: ['./contest-detail-header-right.component.css']
})
export class ContestDetailHeaderRightComponent implements OnInit {
  @Input() contestDetail: any;
  @Input() status: any;
  roundEndTime: any;


  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;

  constructor() { }

  ngOnInit(): void {
    console.log(this.contestDetail);

    this.roundEndTime = moment(this.contestDetail.register_deadline).format('lll');
  }


  x = setInterval(() => {
    let futureDate = new Date(this.roundEndTime).getTime();
    let today = new Date().getTime();
    let distance = futureDate - today;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);

}
