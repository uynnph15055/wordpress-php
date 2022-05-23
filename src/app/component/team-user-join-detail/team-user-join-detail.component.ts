import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-team-user-join-detail',
  templateUrl: './team-user-join-detail.component.html',
  styleUrls: ['./team-user-join-detail.component.css']
})
export class TeamUserJoinDetailComponent implements OnInit {
  team_id: any;
  contest_id: any;
  statusLeader: boolean = false;
  teamDetail: Team;
  statusTeamDetail: boolean = false;
  arrayMembers: Array<ContestMember>;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private teamService: TeamService,
    private contestService: ContestService
    ,
    private userService: UserService) {

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
      this.arrayMembers.concat(result);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getUserValue();
    if (!this.user) {
      this.router.navigate(['/login']);
    }

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
        this.checkUserTeamLeader();
        this.arrayMembers.map(res => {
          res.checked = false;
        })
      }
    })



  }

  checkUserTeamLeader() {
    let leader = this.arrayMembers.filter(item => {
      return item.pivot.bot == 1 && item.id == this.user.id;
    });
    if (leader.length > 0)
      this.statusLeader = true;
    if (this.statusLeader == false)
      this.displayedColumns = this.displayedColumns.filter(item => {
        return item !== 'symbol';
      })
  }


  displayedColumns: string[] = ['position', 'name', 'image', 'weight', 'bot', 'symbol'];

}
