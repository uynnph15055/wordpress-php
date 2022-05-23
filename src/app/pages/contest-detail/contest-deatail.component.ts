import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';
import * as moment from 'moment/moment';
import { ModalAddTeamComponent } from 'src/app/component/modal-add-team/modal-add-team.component';
import { MatDialog } from '@angular/material/dialog';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
import { Enterprise } from 'src/app/models/enterprise.model';
import { param } from 'jquery';
import { Round } from 'src/app/models/round.model';
import { RoundService } from 'src/app/services/round.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl } from '@angular/forms';
import { ResultRound } from 'src/app/models/result-round.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contest-deatail',
  templateUrl: './contest-deatail.component.html',
  styleUrls: ['./contest-deatail.component.css'],
})


export class ContestDeatailComponent implements OnInit {
  forwardComponent: Array<any> = [];
  round_id: any;
  statusRound_id: boolean = false;
  roundDetail: Round;
  statusRoundDetail: boolean = false;
  contestDetail: Contest;
  contestRelated: Array<any>;
  contestCompanySuppor: Enterprise;
  statusContestRelated: boolean = false;
  contentItem: Array<Contest> = [];
  closeResult: string;
  statusContest: boolean = false;
  routeStateRegister: boolean = false;
  contest_id: number = 0;
  nameBtnRegister: string = 'Đăng ký';
  dataResultRound: Array<ResultRound>
  statusResultRound: boolean = false;

  roundEndTime: any;
  contestRelateTo: Array<Contest>;
  statusCheckDate: boolean = true;

  // --------------------------
  statusUserHasJoinContest: boolean = false;
  teamIdMemberHasJoinTeam: number = 0;
  // ---------------------------

  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  sliderSupporter = { "slidesToShow": 3, infinite: true, autoplay: true, arrows: true, prevArrow: '.supporters-arrow-left', nextArrow: '.supporters-arrow-right', slidesToScroll: 1, fadeSpeed: 1000 };

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private contestService: ContestService,
    private getUserLocal: GetValueLocalService,
    private router: Router,
    private roundService: RoundService,
    private toast: NgToastService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    // Check xem người có bấm nút đăng ký ko 
    this.routeStateRegister = history.state.registerNow;

    this.route.paramMap.subscribe(params => {
      if (params.get('round_id')) {
        this.round_id = params.get('round_id');
        this.round_id ? this.statusRound_id = true : false;

        this.roundService.getRoundWhereId(this.round_id).subscribe(res => {
          this.roundDetail = res.payload;
          this.roundDetail ? this.statusRoundDetail = true : false;
        })
      }
    })

    this.route.paramMap.pipe(
      map(params => params.get('contest_id')),
      switchMap(id => this.contestService.getWhereId(id))
    ).subscribe(res => {
      if (res.status == true) {
        this.contestDetail = res.payload;
        this.contestDetail ? this.statusContest = true : false;
        this.contestDetail.enterprise;
      }

      // Các cuộc thi liên quan
      this.contestService.getWhereMajor(this.contestDetail.major_id).subscribe(res => {
        this.contestRelated = res.payload.data.filter((item: any, index: any) => {
          return item.id != this.contestDetail.id && index < 4;
        })
        if (this.contestRelated) {
          this.statusContestRelated = true;
        }
      });

      this.checkUserHasJoinContest();


      // Chạy thời gian hết hạn cuộc thi 
      setInterval(() => {
        this.roundEndTime = moment(this.contestDetail.register_deadline).format('lll');

        // console.log(this.roundEndTime);
        let futureDate = new Date(this.roundEndTime).getTime();

        let today = new Date().getTime();
        let distance = futureDate - today;
        if (distance < 0) {
          this.statusCheckDate = false;
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
          this.nameBtnRegister = 'Đã hết hạn';
        } else {
          this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }

      }, 1000);


      //  Check user có bẫm vào nút đăng ký ko 
      if (this.routeStateRegister == true && this.getUserLocal.getValueLocalUser('user') && this.statusCheckDate == true) {
        this.openDialog();
      }
    });


  }

  // Check xem user đã join cuộc thi chưa
  checkUserHasJoinContest() {
    let user = this.userService.getUserValue();

    let index = this.contestDetail.teams.map(item => {
      let arrMembers = item.members.map(item => {
        if (item.id == user.id) {
          this.teamIdMemberHasJoinTeam = item.pivot.team_id;
        }
        return item.id;
      });
      return arrMembers.concat(arrMembers);
    })[0].indexOf(user.id);

    index > 0 || index == 0 ? this.statusUserHasJoinContest = true : this.statusUserHasJoinContest;
    // console.log(this.statusUserHasJoinContest);
  }

  // Mở model thêm đội thi
  openFormRegister(): void {
    if (this.statusCheckDate == true && this.getUserLocal.getValueLocalUser('user')) {
      this.openDialog();
    } else {
      this.router.navigate(['./login']);
    }
  }

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

  // Kết quả vòng this
  getResultRound(round_id: number) {
    this.roundService.getResultRound(round_id).subscribe(res => {
      if (res.payload) {
        this.dataResultRound = res.payload;
        this.dataResultRound = this.dataResultRound.filter((item: any, index: any) => {
          return index < 11;
        })
        this.dataResultRound ? this.statusResultRound = true : this.statusResultRound;
      }
    })
  }


}
