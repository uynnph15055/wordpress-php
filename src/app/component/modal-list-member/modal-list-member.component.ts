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
  statusResultMembers: boolean = false;
  max_user: number;
  arrayMembers: Array<ContestMember>;
  statusArrayMember: boolean = false;
  listUserJoinTeam: Array<any> = [];
  statusAddMember: boolean;

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
          if (this.arrayMembers.length == 0) {
            this.statusResultMembers = true;
          }
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
    this.statusAddMember = false;
    let countMemberPresent = this.countMemberJoinTeam + this.listUserJoinTeam.length;
    if (this.max_user < countMemberPresent) {
      this.toast.warning({ summary: 'Đã quá giới hạn thành viên cho phép !!!', duration: 3000 });
    }
    else {
      let data = {
        user_id: this.listUserJoinTeam
      }

      if (data.user_id.length == 0) {
        setTimeout(() => {
          this.toast.warning({ summary: 'Bạn chưa chọn thành viên nào !!!', duration: 5000 });
          this.dialogRef.close();
        }, 3000);
      } else {
        this.teamService.addMemberJoinTeam(this.contestId, this.teamId, data).subscribe(res => {
          if (res.status) {
            this.toast.success({ summary: res.payload, duration: 5000 });
            this.dialogRef.close(res.user_pass);
          } else {
            this.toast.error({ summary: res.payload, duration: 5000 });
          }
        })
      }
    }
  }

  // Check all các thành viên
  doCheck(event: any) {
    this.arrayMembers.forEach(element => element.checked = event.checked)
  }

  // Check all tài khoản
  isCheckAll() {
    return this.arrayMembers.every(res => res.checked)
  }

  displayedColumns: string[] = ['index', 'name', 'img', 'email', 'check-box'];

}
