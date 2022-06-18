import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  panelOpenState = false;
  constructor(public dialogRef: MatDialogRef<RecruitmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecruitmentComponent,) { }


  ngOnInit(): void {

  }


  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
