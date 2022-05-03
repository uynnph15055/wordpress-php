import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContestMember } from 'src/app/models/contest-member';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-modal-list-member',
  templateUrl: './modal-list-member.component.html',
  styleUrls: ['./modal-list-member.component.css']
})
export class ModalListMemberComponent implements OnInit {
  keyWord: string;
  contestId: number;
  arrayMembers: Array<ContestMember>;
  statusArrayMember: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalListMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: { keyWord: string, contest_id: number },
    private teamService: TeamService) {
    this.keyWord = data.keyWord;
    this.contestId = data.contest_id;
  }


  ngOnInit(): void {
    const data = {
      key: this.keyWord
    }
    this.teamService.searchMembers(this.contestId, data).subscribe(res => {
      if (res.status == true) {
        this.arrayMembers = res.payload;
        if (this.arrayMembers) {
          this.statusArrayMember = true;
        }
      }

    })
  }


  displayedColumns: string[] = ['index', 'name', 'img', 'email', 'check-box'];

}
