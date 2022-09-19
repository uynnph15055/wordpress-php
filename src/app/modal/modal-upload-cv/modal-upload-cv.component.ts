import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-modal-upload-cv',
  templateUrl: './modal-upload-cv.component.html',
  styleUrls: ['./modal-upload-cv.component.css']
})
export class ModalUploadCvComponent implements OnInit {
  postDetail: Post;
  constructor(
    public dialogRef: MatDialogRef<ModalUploadCvComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { recruitment: Post}
  ) { }

  ngOnInit(): void {
    this.postDetail = this.data.recruitment;
  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
