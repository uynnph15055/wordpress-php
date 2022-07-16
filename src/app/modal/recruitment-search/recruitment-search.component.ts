import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recruitment-search',
  templateUrl: './recruitment-search.component.html',
  styleUrls: ['./recruitment-search.component.css']
})
export class RecruitmentSearchComponent implements OnInit {

  constructor(   public dialogRef: MatDialogRef<RecruitmentSearchComponent>,) { }

  ngOnInit(): void {
  }

}
