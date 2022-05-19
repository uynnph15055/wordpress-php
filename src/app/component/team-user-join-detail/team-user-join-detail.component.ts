import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddTeamComponent } from '../modal-add-team/modal-add-team.component';

import { map, switchMap } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import { ContestMember } from 'src/app/models/contest-member';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalListMemberComponent } from '../modal-list-member/modal-list-member.component';
import { param } from 'jquery';
import { ContestService } from 'src/app/services/contest.service';

@Component({
  selector: 'app-team-user-join-detail',
  templateUrl: './team-user-join-detail.component.html',
  styleUrls: ['./team-user-join-detail.component.css']
})
export class TeamUserJoinDetailComponent implements OnInit {
  team_id: any;
  contest_id: any;
  teamDetail: Team;
  statusTeamDetail: boolean = false;
  arrayMembers: Array<ContestMember>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private teamService: TeamService,
    private contestService: ContestService) {
  }

  formSearchMembers = new FormGroup({
    keyWord: new FormControl('', Validators.required),
  });


  // Timf kiếm thành viên
  searchMembers() {
    let key_word = { ...this.formSearchMembers.value }

    this.openListMemberJoinTeam(key_word.keyWord);


  }

  openDialog(): void {
    // Lấy dữ liệu từ modal điều hướng sang chi tiết đội thi
    const dialogRef = this.dialog.open(ModalAddTeamComponent, {
      width: "490px",
      data: {
  
        contest_id: 40,
        team_id: this.teamDetail,
        countMembers: this.arrayMembers.length,
      },

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // Mở danh sách các member theo keyword
  openListMemberJoinTeam(keyWord: any) {
    const dialogRef = this.dialog.open(ModalListMemberComponent, {
      width: "800px",
      data: {
        keyWord: keyWord,
        contest_id: this.teamDetail.contest_id,
        team_id: this.team_id,
        array_members: this.arrayMembers.length
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Check all các thành viên
  doCheck(event: any) {
    this.arrayMembers.forEach(element => element.checked = event.checked)
  }

  // Check all tài khoản
  isCheckAll() {
    return this.arrayMembers.every(res => res.checked)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.team_id = params.get('team_id');
      this.contest_id = params.get('contest_id');
    });


    // Trả ra chi tiết đội
    this.teamService.getTeamDetail(this.team_id).subscribe(res => {
      this.teamDetail = res.payload;
      if (this.teamDetail) {
        this.statusTeamDetail = true;
        this.arrayMembers = this.teamDetail.members;
        this.arrayMembers.map(res => {
          res.checked = false;
        })
      }
    })


  }


  displayedColumns: string[] = ['position', 'name', 'image', 'weight', 'symbol', 'check-box'];
}
