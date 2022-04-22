import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment/moment';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';
import { ModalAddTeamComponent } from '../modal-add-team/modal-add-team.component';

@Component({
  selector: 'app-contest-detail-header-right',
  templateUrl: './contest-detail-header-right.component.html',
  styleUrls: ['./contest-detail-header-right.component.css']
})
export class ContestDetailHeaderRightComponent implements OnInit {
  @Input() contestDetail: any;
  @Input() status: any;
  closeResult: string;
  roundEndTime: any;
  contestRelateTo: Array<Contest>;

  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;

  constructor(public dialog: MatDialog, private contestService: ContestService) { }

  ngOnInit(): void {
    console.log(this.contestDetail);

    this.roundEndTime = moment(this.contestDetail.register_deadline).format('lll');

    setInterval(() => {
      let futureDate = new Date(this.roundEndTime).getTime();
      let today = new Date().getTime();
      let distance = futureDate - today;
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);

    console.log(this.contestDetail);


    this.openDialog();
  }

  // Các cuộc thi liên quan
  getContestRelateTo() {
    this.contestService.getWhereMajor(this.contestDetail.major_id).subscribe(res => {
      this.contestRelateTo = res.payload.data;
      console.log(this.contestRelateTo);

    });
  }

  // Mở modal đăng ký thêm đội
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddTeamComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}







