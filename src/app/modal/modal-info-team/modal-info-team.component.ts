import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info-team',
  templateUrl: './modal-info-team.component.html',
  styleUrls: ['./modal-info-team.component.css']
})
export class ModalInfoTeamComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalInfoTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalInfoTeamComponent,) { }

  ngOnInit(): void {
  }

}
