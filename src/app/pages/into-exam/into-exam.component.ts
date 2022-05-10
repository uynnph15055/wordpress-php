import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, switchMap } from 'rxjs';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';

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
  members: Array<any>;
  infoContest: Contest;
  statusInfo: boolean = false;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private contestService: ContestService) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map(params => params.get('contest_id')),
      switchMap(id => this.contestService.getWhereId(id))
    ).subscribe(res => {
      if (res.status == true) {
        this.infoContest = res.payload;
        this.infoContest ? this.statusInfo = true : false;
        console.log(this.infoContest);

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

    this.members = [
      {
        "id": 5,
        "name": "Nguyễn Ngọc Uy",
        "email": "uynnph15055@fpt.edu.vn",
        "created_at": "2022-03-02T04:30:37.000000Z",
        "updated_at": "2022-04-22T06:34:39.000000Z",
        "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgjBzpR0REPGZm6Ij77ojT8FryEgMpdfbFw5XhbKQ=s96-c",
        "status": 1,
        "deleted_at": null,
        "pivot": {
          "team_id": 402,
          "user_id": 5,
          "bot": 1
        }
      },
      {
        "id": 1,
        "name": "Trần Hữu Thiện",
        "email": "thienth@fpt.edu.vn",
        "created_at": "2022-03-02T04:30:36.000000Z",
        "updated_at": "2022-03-06T10:23:54.000000Z",
        "avatar": "https://lh3.googleusercontent.com/a-/AOh14Ghb4FVOe6nNmroH4IA8W4DNWMXSX_X8y4FCh3z1=s96-c",
        "status": 1,
        "deleted_at": null,
        "pivot": {
          "team_id": 402,
          "user_id": 1,
          "bot": null
        }
      },
      {
        "id": 2,
        "name": "Nguyễn Đức Bình",
        "email": "binhndph15107@fpt.edu.vn",
        "created_at": "2022-03-02T04:30:37.000000Z",
        "updated_at": "2022-03-04T10:21:40.000000Z",
        "avatar": null,
        "status": 1,
        "deleted_at": null,
        "pivot": {
          "team_id": 402,
          "user_id": 2,
          "bot": null
        }
      },
      {
        "id": 3,
        "name": "Trần Văn Quảng",
        "email": "quangtvph14034@fpt.edu.vn",
        "created_at": "2022-03-02T04:30:37.000000Z",
        "updated_at": "2022-03-08T03:17:04.000000Z",
        "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgTtmVId4_yz9YcdRGiLP2Cq51g-wTMGJfJTJYJ=s96-c",
        "status": 1,
        "deleted_at": null,
        "pivot": {
          "team_id": 402,
          "user_id": 3,
          "bot": null
        }
      },
      {
        "id": 4,
        "name": "Nguyễn Văn Trọng",
        "email": "trongnvph13949@fpt.edu.vn",
        "created_at": "2022-03-02T04:30:37.000000Z",
        "updated_at": "2022-03-07T10:06:31.000000Z",
        "avatar": "https://lh3.googleusercontent.com/a-/AOh14GjVKU12OxRV_z6iFjm_NfQepgKVRbr9DBomDVcE=s96-c",
        "status": 1,
        "deleted_at": null,
        "pivot": {
          "team_id": 402,
          "user_id": 4,
          "bot": null
        }
      }
    ];


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

  displayedColumns: string[] = ['index', 'name', 'avatar', 'email', 'bot'];
}
