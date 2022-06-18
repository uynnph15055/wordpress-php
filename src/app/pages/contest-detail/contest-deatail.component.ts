import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Contest } from 'src/app/models/contest';
import { Slider } from 'src/app/models/slider.model';
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
import { SliderService } from 'src/app/services/slider.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-contest-deatail',
  templateUrl: './contest-deatail.component.html',
  styleUrls: ['./contest-deatail.component.css'],
})


export class ContestDeatailComponent implements OnInit {
  round_id: any;
  closeResult: string;
  contest_id: number = 0;
  teamIdMemberHasJoinTeam: number = 0;
  nameBtnRegister: string = 'Đăng ký';
  roundEndTime: any;
  contestRelateTo: Array<Contest>;
  resultRoundBefore: Array<ResultRound>;
  sliderContest: Array<Slider>;
  contestCompanySuppor: Enterprise;
  contentItem: Array<Contest> = [];
  forwardComponent: Array<any> = [];
  // ---------------------------

  contestDetail: Contest;
  contestRelated: Array<any>;
  countContestRelated: boolean = false;
  statusRound_id: boolean = false;
  statusRoundDetail: boolean = false;
  statusContestRelated: boolean = false;
  statusContest: boolean = false;
  routeStateRegister: boolean = false;
  statusResultRound: boolean = false;
  statusCheckDate: boolean = true;
  statusPage: boolean = false;
  statusResultRoundBefore: boolean = false;
  statusUserHasJoinContest: boolean = false;


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
    private slider: SliderService,
    private userService: UserService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.statusPage = true;
    this.runTop();
    this.routeStateRegister = history.state.registerNow;

    this.route.paramMap.pipe(
      map(params => params.get('contest_id')),
      switchMap(id => this.contestService.getWhereId(id))
    ).subscribe(res => {
      if (res.status) {
        this.contestDetail = res.payload;
        this.contestDetail ? this.statusContest = true : this.statusContest;
        this.statusPage = false;
        this.contestDetail.enterprise;
        this.slider.getListSlider('major', 'major_id', this.contestDetail.major_id).subscribe(res => {
          if (res.status) {
            this.sliderContest = res.payload;
          }
        })
        this.runTop();
        if (this.contestDetail.rounds.length > 2) {
          this.round_id = this.getRoundId(this.contestDetail.rounds, 1);
          this.getResultRoundBefore(this.contestDetail.rounds, 2);
        }

        // ---

        // Các cuộc thi liên quan
        this.contestService.getWhereMajor(this.contestDetail.major_id).subscribe(res => {
          if (res.payload.data.length > 0) {
            this.contestRelated = res.payload.data.filter((item: any, index: any) => {
              return item.id != this.contestDetail.id && index < 4;
            })
            if (this.contestRelated) {
              this.statusContestRelated = true;
              this.contestRelated.length > 0 ? this.countContestRelated = true : this.countContestRelated;
            }
          }
        });

        this.checkUserHasJoinContest();

        // Chạy thời gian hết hạn cuộc thi 
        setInterval(() => {
          this.roundEndTime = moment(this.contestDetail.end_register_time).format('lll');
          console.log(this.roundEndTime);

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
          if (this.routeStateRegister == false && this.getUserLocal.getValueLocalUser('user') && this.statusCheckDate == true) {
            this.openDialog();
          }
        }, 3000);
      }
    });
  }

  // Check xem user đã join cuộc thi chưa
  checkUserHasJoinContest() {
    let user = this.userService.getUserValue();

    this.contestDetail.teams.forEach(item => {
      item.members.forEach(item => {
        if (item.id == user.id) {
          this.teamIdMemberHasJoinTeam = item.pivot.team_id;
          this.statusUserHasJoinContest = true;
        }
      });
    })
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


  // Kết quả vòng thi trước đó
  getResultRoundBefore(arrRound: Array<Round>, index: number) {

    console.log(this.getRoundId(arrRound, index));

    this.roundService.getResultRound(this.getRoundId(arrRound, index)).subscribe(res => {
      if (res.status) {
        this.resultRoundBefore = res.payload.data;
        this.resultRoundBefore.length > 0 ? this.statusResultRoundBefore = true : this.statusResultRoundBefore;
      }
    })
  }


  // Lấy ra id vòng thi cuối cùng của cuộc thi.
  getRoundId(arr: Array<Round>, element: number) {
    return arr[arr.length - element].id
  }

  scrollWin(section: number) {
    window.scrollTo(0, section);
  }

  runTop() {
    $('html , body').animate({
      scrollTop: 0
    }, 1000);
  }

  //Tìm kiếm sinh viên kết quả
  searchTeamRank(event: any) {
    this.getResultRoundBefore(this.contestDetail.rounds, 2);
    let searchTeamRank = event.target.value;
    if (searchTeamRank != null) {
      this.resultRoundBefore = this.resultRoundBefore.filter(res => {
        return res.name.includes(searchTeamRank);
      });
    } else {
      this.getResultRoundBefore(this.contestDetail.rounds, 2);
    }

  }


  // Mở nộ dung vòng thi
  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
