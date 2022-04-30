import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-direction-team',
  templateUrl: './modal-direction-team.component.html',
  styleUrls: ['./modal-direction-team.component.css']
})
export class ModalDirectionTeamComponent implements OnInit {
  id_team: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idTeamNew: number }) {
    this.id_team = data.idTeamNew;
  }

  ngOnInit(): void {
    console.log(this.id_team);

  }

}
