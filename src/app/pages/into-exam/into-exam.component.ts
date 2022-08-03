import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, switchMap } from 'rxjs';
import { Contest } from 'src/app/models/contest';

import { Observable } from "rxjs";
import { ContestService } from 'src/app/services/contest.service';
import { param } from 'jquery';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import { RoundService } from 'src/app/services/round.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TakeExam } from 'src/app/models/take-exam.model';
import { NgToastService } from 'ng-angular-popup';
import { Round } from 'src/app/models/round.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoTeamComponent } from 'src/app/modal/modal-info-team/modal-info-team.component';

@Component({
  selector: 'app-into-exam',
  templateUrl: './into-exam.component.html',
  styleUrls: ['./into-exam.component.css']
})
export class IntoExamComponent implements OnInit {

  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  roundId: any;
  infoContest: Contest;
  roundDetail: Round;
  titleModelName: any;
  teamDetail: Team;
  statusInfo: boolean = true;
  statusContest: boolean = false;
  statusTeamDetail: boolean = false;
  contestId: number;
  statusSubmitExam: boolean;
  statusSaveExam: boolean;
  infoExam: TakeExam;
  statusPage: boolean = false;
  assignment: Object;

  statusClickSubmit: boolean = false;
  assignmentFiles: boolean = false;
  assignmentLinks: boolean = false;


  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private router: Router,
    private teamService: TeamService,
    private roundService: RoundService,
    private toast: NgToastService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // Chi tiết cuộc thi
    this.route.paramMap.pipe(
      map(params => params.get('contest_id')),
      switchMap(id => this.contestService.getWhereId(id))
    ).subscribe(res => {
      if (res.status) {
        this.infoContest = res.payload;
        this.infoContest ? this.statusContest = true : this.statusContest;
      }
    })

    const round = {
      round_id: 0
    }

    this.route.paramMap.subscribe(param => {
      this.roundId = param.get('round_id');
      round.round_id = this.roundId;
      this.roundService.getRoundWhereId(this.roundId).subscribe(res => {
        if (res.payload)
          this.roundDetail = res.payload;
        round.round_id = this.roundId;
        this.roundDetail ? this.statusInfo = false : this.statusInfo;
        setInterval(() => {
          let futureDate = new Date(this.roundDetail.end_time).getTime();
          let today = new Date().getTime();
          let distance = futureDate - today;

          this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
        this.roundService.getInfoTeamFromContestId(this.roundId)
          .subscribe(res => {
            if (res.status) {
              this.teamDetail = res.payload;

              this.teamDetail ? this.statusTeamDetail = true : this.statusTeamDetail;
              round.round_id = this.teamDetail.id;
            }
          })
      })


    }
    );

    // thông tin đề thi thoe vòng thi
    if (this.roundId) {
      this.getInfoExam(round);
    }

    // Get roundId vs get teamDetail

  }

  // dowload đề bài
  downloadExam() {
    this.statusPage = true;
    window.location.href = 'https://drive.google.com/uc?id=1SBfNihiQPHx9Fp8XaoADpKFis2w7MNB6&export=media';
    setTimeout(() => {
      this.statusPage = false;
    }, 2000);
  }

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // Check xem ai là trưởng nhóm
  checkLeader(bot: number) {
    if (bot == 1) {
      return 'Trưởng nhóm';
    }
    return '';
  }

  // get Info Đề bài
  getInfoExam(round: object) {
    this.roundService.getInfoExamRound(round).subscribe(res => {
      if (res.status)
        this.infoExam = res.payload;
    })
  }

  // Nộp bài
  submit() {
  }

  // Nộp bài bằng file
  submitExamByFile(files: any) {
    this.statusSubmitExam = false;
    var resultExam = new FormData();
    resultExam.append('file_url', files[0]);
    resultExam.append('id', this.infoExam.id);
    setTimeout(() => {
      if (files[0]) {
        this.statusSubmitExam = true;
        this.assignmentFiles = true;
      }
    }, 3000);
    this.assignment = resultExam;
    console.log(this.assignment);
  }

  // Nộp bài bằng link
  submitExamByLink(link: any) {
    this.statusSubmitExam = false;
    let resultExam = {
      result_url: link.target.value,
      id: this.infoExam.id,
    }
    setTimeout(() => {
      if (resultExam.result_url != '') {
        this.statusSubmitExam = true;
        this.assignmentLinks = true;
      }
    }, 3000);
    this.assignment = resultExam;
  }


  removeAssFile() {
    this.statusSubmitExam = false;
    setTimeout(() => {
      this.assignment = {};
      this.assignmentFiles = false;
      this.statusSubmitExam = true;
    }, 3000);
  }


  removeAssLink() {
    this.statusSubmitExam = false;
    setTimeout(() => {
      this.assignment = {};
      this.assignmentLinks = false;
      this.statusSubmitExam = true;
    }, 3000);
  }

  submitExam() {
    this.statusClickSubmit = true;
    this.roundService.submitExam(this.assignment).subscribe(res => {
      console.log(res);
      if (res.status) {
        setTimeout(() => {
          this.statusClickSubmit = false;
          this.toast.success({ summary: 'Nộp bài thành công !!!', duration: 5000 });
        }, 3000);
      }
    })
  }

  copyLinkUrl() {
    navigator.clipboard.writeText(window.location.href);
    this.toast.info({ summary: 'Đã copy !!!', duration: 5000 });
  }

  // Thông tin chi tiết của đội thi
  openInfoTeamDetail() {
    this.dialog.open(ModalInfoTeamComponent, {
      width: '900px',
      data: {
        statusExam: true,
        contest_id: this.contestId,
        team_id: this.teamDetail.id,
      }
    })
  }

  displayedColumns: string[] = ['index', 'name', 'avatar', 'email', 'bot'];
}
