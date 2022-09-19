import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map, switchMap } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { ListPostService } from 'src/app/services/list-post.service';

@Component({
  selector: 'app-modal-upload-cv',
  templateUrl: './modal-upload-cv.component.html',
  styleUrls: ['./modal-upload-cv.component.css']
})
export class ModalUploadCvComponent implements OnInit {
  postDetail: Post;
  validateForm!: FormGroup;
  statusRegister: boolean = true;
  fileUpload: any;

  // set up form control
  formUploadCv = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    // phone: new FormControl('', [Validators.required, Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\b")]),
    // file_link: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalUploadCvComponent>,
    private postService: ListPostService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA)
    public dataPostDetail: { postDetail: Post }
  ) { }

  ngOnInit(): void {
    console.log(this.dataPostDetail.postDetail.id)
  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  // review file upload
  preview(files: any) {

    if (files.length === 0) return;
    var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    this.fileUpload = files[0];
  }

  //Send information Upload cv
  onSubmit() {
    this.statusRegister = false;
    let dataInput = { ...this.formUploadCv.value };
    var formDataInput = new FormData();

   
    formDataInput.append('name', dataInput.name);
    formDataInput.append('email', dataInput.email);
    formDataInput.append('phone', dataInput.phone);
    formDataInput.append('file_link', dataInput.file_link);
    formDataInput.append('post_id', this.dataPostDetail.postDetail.id);
    
    // setTimeout(() => {
    //   this.postService.addTeam(formDataInput).subscribe((res) => {
    //     if (res.status == false) {
    //       this.toast.warning({ summary: res.payload, duration: 2000 });
    //       this.dialogRef.close();
    //     } else {
    //       this.statusRegister = true;
    //       this.openInfoTeam(res.id_team, this.data.contest_id);
    //       this.dialogRef.close();
    //       this.ngOnInit();
    //     }
    //   });
    // }, 1000);
  }
}
