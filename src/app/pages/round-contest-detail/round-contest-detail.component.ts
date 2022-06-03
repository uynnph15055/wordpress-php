
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
import * as $ from 'jquery';

@Component({
  selector: 'app-round-contest-detail',
  templateUrl: './round-contest-detail.component.html',
  styleUrls: ['./round-contest-detail.component.css']
})


export class RoundContestDetailComponent implements OnInit {
  forwardComponent: Array<any> = [];
  round_id: any;
  statusRound_id: boolean = false;
  roundDetail: Round;
  statusRoundDetail: boolean = false;
  statusIntoExam: boolean = false;
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
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    this.runTop();
    this.routeStateRegister = history.state.registerNow;

    this.route.paramMap.subscribe(params => {
      if (params.get('round_id')) {
        this.round_id = params.get('round_id');

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
        this.runTop();
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
      setTimeout(() => {
        if (this.routeStateRegister == true && this.getUserLocal.getValueLocalUser('user') && this.statusCheckDate == true) {
          this.openDialog();
        }
      }, 3000);
    });
  }

  // Check xem user đã join cuộc thi chưa
  checkUserHasJoinContest() {
    let user = this.userService.getUserValue();

    this.contestDetail.teams.forEach(item => {
      item.members.forEach(item => {
        if (item.id == user.id) {
          this.teamIdMemberHasJoinTeam = item.pivot.team_id;
          this.statusUserHasJoinContest = true
        }
      });
    })
  }

  // Mơ lắm
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
  
  scrollWin(section: number) {
    window.scrollTo(0, section);
  }

  runTop() {
    $('html , body').animate({
      scrollTop: 0
    }, 1000);
  }

  takeTheExam(round_id: number, end_time: Date) {
    this.statusIntoExam = true;
    setTimeout(() => {
      if (!this.userService.getUserValue()) {
        this.toast.warning({ summary: 'Bạn chưa đăng nhập !!!', duration: 3000 });
        this.router.navigate(['./login']);
      }

      let dateTime = new Date(end_time).getTime();
      let todayTime = new Date().getTime();
      if (todayTime > dateTime) {
        this.toast.warning({ summary: 'Đã hết thời gian thi !!!', duration: 3000 });
        this.statusIntoExam = false;
      } else {
        this.roundService.getInfoTeamFromContestId(round_id)
          .subscribe(res => {
            if (res.payload.length == 0) {
              this.toast.warning({ summary: 'Bạn chưa tham gia cuộc thi này !', duration: 5000 });
              this.statusIntoExam = false;
            } else {
              this.router.navigate(['/vao-thi', this.roundDetail.contest_id, 'vong', this.roundDetail.id]);
            }
          })
      }
    }, 3000);
  }
}

