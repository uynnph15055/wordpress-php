import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContestMember } from 'src/app/models/contest-member';
import { TeamService } from 'src/app/services/team.service';
import { NgToastService } from 'ng-angular-popup';
import { ContestService } from 'src/app/services/contest.service';

@Component({
  selector: 'app-modal-list-member',
  templateUrl: './modal-list-member.component.html',
  styleUrls: ['./modal-list-member.component.css']
})
export class ModalListMemberComponent implements OnInit {
  keyWord: string;
  contestId: number;
  teamId: number;
  countMemberJoinTeam: number;
  max_user: number;
  arrayMembers: Array<ContestMember>;
  statusArrayMember: boolean = false;
  listUserJoinTeam: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<ModalListMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    keyWord: string, contest_id: number, team_id: number, array_members: number;
  },
    private teamService: TeamService,
    private toast: NgToastService,
    private contestService: ContestService) {
    this.keyWord = data.keyWord;
    this.contestId = data.contest_id;
    this.teamId = data.team_id;
    this.countMemberJoinTeam = data.array_members
  }

  ngOnInit(): void {
    const data = {
      key: this.keyWord
    }

    this.contestService.getWhereId(this.contestId).subscribe(res => {
      this.max_user = res.payload.max_user;
    })


    this.teamService.searchMembers(this.contestId, data).subscribe(res => {
      if (res.status == true) {
        this.arrayMembers = res.payload;
        if (this.arrayMembers) {
          this.statusArrayMember = true;
        }
      }

    })
  }

  //Them id của từng thành viên vao mảng
  addItemUser(user_id: any) {
    this.listUserJoinTeam.push(user_id);
  }

  // thêm thành viên vào mảng
  addUserTeam() {
    let countMemberPresent = this.countMemberJoinTeam + this.listUserJoinTeam.length;
    // console.log(this.countMemberJoinTeam);

    if (this.max_user < countMemberPresent) {
      this.toast.warning({ summary: 'Đã quá giới hạn thành viên cho phép !!!', duration: 5000 });
    }
    else {
      let data = {
        user_id: this.listUserJoinTeam
      }
      this.teamService.addMemberJoinTeam(this.contestId, this.teamId, data).subscribe(res => {
        console.log(res);

        if (res.status) {
          this.toast.success({ summary: res.payload, duration: 5000 });
        } else {
          this.toast.error({ summary: 'Lỗi không thêm được thành viên !', duration: 5000 });
        }
      })
    }
  }

  displayedColumns: string[] = ['index', 'name', 'img', 'email', 'check-box'];

}
