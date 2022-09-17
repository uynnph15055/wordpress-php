import { Component, Input, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import * as moment from 'moment/moment';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
import { ModalAddTeamComponent } from 'src/app/modal/modal-add-team/modal-add-team.component';
import { ModalInfoTeamComponent } from 'src/app/modal/modal-info-team/modal-info-team.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contest-aside',
  templateUrl: './contest-aside.component.html',
  styleUrls: ['./contest-aside.component.css'],
})
export class ContestAsideComponent implements OnInit {
  @Input() contestDetail: Contest;
  roundEndTime: any;
  statusCheckDate: boolean = true;
  statusUserHasJoinContest: boolean = false;
  routeStateRegister: boolean = false;
  nameBtnRegister: string = 'Đăng ký';

  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(
    private getUserLocal: GetValueLocalService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (
        this.routeStateRegister == true &&
        this.getUserLocal.getValueLocalUser('user') &&
        this.statusCheckDate == true
      ) {
        this.openAddTeam();
      }
    }, 3000);
  }

  runCountDownTime(){
    if(this.contestDetail){
      setInterval(() => {
        this.roundEndTime = moment(this.contestDetail.end_register_time).format(
          'lll'
        );
  
        let futureDate = new Date(this.roundEndTime).getTime();
        let today = new Date().getTime();
        let distance = futureDate - today;
        if (distance < 0) {
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
          this.nameBtnRegister = 'Đã hết hạn';
        } else {
          this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }
      }, 1000);
  
    
    }
  }

  // Mở model thêm đội thi
  openFormRegister(): void {
    if (
      this.statusCheckDate == true &&
      this.getUserLocal.getValueLocalUser('user')
    ) {
      this.openAddTeam();
    } else {
      this.router.navigate(['./login']);
    }
  }

  // Thông tin đội
  openInfoTeam() {
    let teamId;

    this.contestDetail.teams.forEach((it: any) => {
      it.members.forEach((item: any) => {
        if (item.id == this.userService.getUserValue().id) {
          teamId = it.id;
        }
      });
    });

    this.dialog.open(ModalInfoTeamComponent, {
      width: '900px',
      data: {
        contest_id: this.contestDetail.id,
        team_id: teamId,
      },
    });
  }

  openAddTeam(): void {
    const dialogRef = this.dialog.open(ModalAddTeamComponent, {
      width: '490px',
      data: {
        contest_id: this.contestDetail.id,
        team_id: '',
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
