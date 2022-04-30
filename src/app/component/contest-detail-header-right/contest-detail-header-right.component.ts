import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
import { ModalAddTeamComponent } from '../modal-add-team/modal-add-team.component';

@Component({
  selector: 'app-contest-detail-header-right',
  templateUrl: './contest-detail-header-right.component.html',
  styleUrls: ['./contest-detail-header-right.component.css']
})
export class ContestDetailHeaderRightComponent implements OnInit {
  @Input() contestDetail: Contest;
  @Input() status: any;
  @Input() routeStateRegister: any;
  closeResult: string;
  roundEndTime: any;
  contestRelateTo: Array<Contest>;
  dateCheck: boolean = true;

  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(public dialog: MatDialog, private contestService: ContestService, private getUserLocal: GetValueLocalService, private route: Router) { }


  ngOnInit(): void {

    setInterval(() => {
      this.roundEndTime = moment(this.contestDetail.register_deadline).format('lll');


      let futureDate = new Date(this.roundEndTime).getTime();

      let today = new Date().getTime();
      let distance = futureDate - today;
      if (distance < 0) {
        this.dateCheck = false;
      }
      console.log(distance);

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);


    if (this.routeStateRegister == true && this.getUserLocal.getValueLocalUser('user')) {
      this.openDialog();
    } else if (!this.getUserLocal.getValueLocalUser('user')) {
      this.route.navigate(['/login']);
    }
  }

  // Các cuộc thi liên quan
  getContestRelateTo() {
    this.contestService.getWhereMajor(this.contestDetail.major_id).subscribe(res => {
      this.contestRelateTo = res.payload.data;
    });
  }

  // Mở modal đăng ký thêm đội
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddTeamComponent, {
      width: "490px",
      data: {
        contest_id: this.contestDetail.id,
        team_id: '',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}







