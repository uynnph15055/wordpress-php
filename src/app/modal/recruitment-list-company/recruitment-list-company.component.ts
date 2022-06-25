import { Component, Inject, OnInit } from '@angular/core';
import { RecruitmentComponent } from './../recruitment/recruitment.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-recruitment-list-company',
  templateUrl: './recruitment-list-company.component.html',
  styleUrls: ['./recruitment-list-company.component.css']
})
export class RecruitmentListCompanyComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RecruitmentListCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecruitmentListCompanyComponent,) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  openRecruitmentDetail(): void {
    this.closeDialog();
    this.dialog.open(RecruitmentComponent, {
    })
  }

}
