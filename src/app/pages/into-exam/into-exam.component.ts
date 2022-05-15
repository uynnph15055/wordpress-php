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
  titleModelName: any;
  teamDetail: Team;
  statusInfo: boolean = false;
  statusTeamDetail: boolean = false;
  contestId: number;
  statusSubmitExam: boolean;
  infoExam: TakeExam;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private router: Router,
    private teamService: TeamService,
    private roundService: RoundService,
    private toast: NgToastService) { }

  slides =
    {
      name: 'Mobile Cross-Platform from a Progressive Perspective', url: 'https://nils-mehlhorn.de/slides/mobile_cp_progessive_mehlhorn_pottjs.pdf'
    }


  ngOnInit(): void {
    const round = {
      round_id: 0
    }

    this.route.paramMap.subscribe(param => {
      this.roundId = param.get('round_id');
      round.round_id = this.roundId;
    }
    );

    // thông tin đề thi thoe vòng thi
    if (this.roundId) {
      this.getInfoExam(round);
    }

    // Get roundId vs get teamDetail
    this.roundService.getInfoTeamFromContestId(this.roundId)
      .subscribe(res => {
        res.status ? this.teamDetail = res.payload : null;
        this.teamDetail ? this.statusTeamDetail = true : false;
        round.round_id = this.teamDetail.id;
      })

    // Chi tiết cuộc thi
    this.route.paramMap.pipe(
      map(params => params.get('contest_id')),
      switchMap(id => this.contestService.getWhereId(id))
    ).subscribe(res => {
      if (res.status == true) {
        this.infoContest = res.payload;
        this.infoContest ? this.statusInfo = true : false;
        // this.getInfoTeamFromContestId(this.infoContest.id);
      }
    })

    setInterval(() => {

      let futureDate = new Date("May 20, 2022 10:59 PM").getTime();

      let today = new Date().getTime();
      let distance = futureDate - today;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);


  }

  // dowload đề bài
  downloadExam() {
    window.location.href = 'https://drive.google.com/uc?id=1SBfNihiQPHx9Fp8XaoADpKFis2w7MNB6&export=media';
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
      // if (this.infoExam.result_url != '')
      //   this.statusSubmitExam = true
      console.log(this.infoExam.result_url);

    })
  }

  // Nộp bài bằng file
  submitExamByFile(files: any) {
    this.statusSubmitExam = false;
    var resultExam = new FormData();

    resultExam.append('file_url', files);
    // resultExam.append('id', this.infoExam.id);
    this.submitExam(resultExam);
  }

  // Nộp bài bằng link
  submitExamByLink(link: any) {
    this.statusSubmitExam = false;
    let resultExam = {
      result_url: link.target.value,
      id: this.infoExam.id,
    }
    this.submitExam(resultExam);
  }

  // Hủy bài làm
  deleteExam() {
    // this.statusSubmitExam = false;
    let resultExam = {
      result_url: '',
      id: this.infoExam.id,
    }
    this.submitExam(resultExam);
  }

  submitExam(resultExam: Object) {
    this.roundService.submitExam(resultExam).subscribe(res => {
      console.log(res);

      if (res.status) {
        setTimeout(() => {
          this.statusSubmitExam = true;
        }, 3000);
        this.toast.success({ summary: 'Nộp bài thành công !!!', duration: 5000 });
      }

    })
  }

  displayedColumns: string[] = ['index', 'name', 'avatar', 'email', 'bot'];
}
