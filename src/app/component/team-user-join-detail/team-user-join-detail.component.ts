import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddTeamComponent } from '../modal-add-team/modal-add-team.component';

import { map, switchMap } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import { ContestMember } from 'src/app/models/contest-member';

@Component({
  selector: 'app-team-user-join-detail',
  templateUrl: './team-user-join-detail.component.html',
  styleUrls: ['./team-user-join-detail.component.css']
})
export class TeamUserJoinDetailComponent implements OnInit {
  team_id: any;
  teamDetail: Team;
  statusTeamDetail: boolean = false;
  arrayMembers: Array<ContestMember>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private teamService: TeamService) {
  }

  openDialog(): void {
    // Lấy dữ liệu từ modal điều hướng sang chi tiết đội thi
    const dialogRef = this.dialog.open(ModalAddTeamComponent, {
      width: "490px",
      data: {
        contest_id: 40,
        team_id: this.teamDetail
      },

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // Check all các thành viên
  doCheck(event: any) {
    this.arrayMembers.forEach(element => element.checked = event.checked)
  }

  // 
  isCheckAll() {
    return this.arrayMembers.every(res => res.checked)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.team_id = params.get('team_id');
    });

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
