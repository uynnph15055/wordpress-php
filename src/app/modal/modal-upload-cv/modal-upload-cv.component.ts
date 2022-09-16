import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recruitments } from 'src/app/models/recruitments.models';

@Component({
  selector: 'app-modal-upload-cv',
  templateUrl: './modal-upload-cv.component.html',
  styleUrls: ['./modal-upload-cv.component.css']
})
export class ModalUploadCvComponent implements OnInit {
  recruitmentDetail: Recruitments;
  constructor(
    public dialogRef: MatDialogRef<ModalUploadCvComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { recruitment: Recruitments;}
  ) { }

  ngOnInit(): void {
    this.recruitmentDetail = this.data.recruitment;
    console.log(this.recruitmentDetail);
    
  }

}
