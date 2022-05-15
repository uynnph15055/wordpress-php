import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  listTeam: any = [];
  statusRound: number;
  statusOpenRound: number;

  step = 0;
  @Input() contestDetail: any;
  @Input() statusContest: boolean;


  constructor() { }

  ngOnInit(): void {
    // console.log(this.contestDetail.rounds);
  }

  setStep(index: number) {
    this.step = index;
  }

  // Lấy image ban giám khảo
  getImageJudges(judges: any): Array<any> {
    let arrayImage: any = [];
    let imageItem = {
      image: ''
    }
    judges.forEach((res: any) => {
      imageItem.image = res.user.avatar;
      arrayImage.push(imageItem);
    })
    return arrayImage;
  }



  // Check trạng thái xòng thi


  //  Điếm số thành viên tham gia vòng thi 
  getMembers(teams: Array<Team> = []): number {
    let totalMember = 0;
    teams.forEach(t => {
      if (t.members != undefined) {
        totalMember += t.members.length;
      }
    });
    return totalMember;
  }

  // Check trạng thái vòng thi
  checkStatusRound(start_time: string, end_time: string, id_round: number): any {
    let result;
    let startTime = new Date(start_time).getTime();
    let endTime = new Date(end_time).getTime();
    let todayTime = new Date().getTime();

    if (todayTime > endTime) {
      this.statusRound = 1;
      result = 'Đã hết bạn';
    } else if (startTime < todayTime && todayTime < endTime) {
      this.statusRound = 2;
      result = 'Đang mở';
      this.setStep(id_round);
    } else if (todayTime < endTime) {
      this.statusRound = 3;
      result = 'Sắp mở';
    }

    return result;
  }
}
