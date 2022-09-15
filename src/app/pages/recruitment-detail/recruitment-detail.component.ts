import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ModalUploadCvComponent } from 'src/app/modal/modal-upload-cv/modal-upload-cv.component';
import { Capacity } from 'src/app/models/capacity';
import { Contest } from 'src/app/models/contest';
import { Post } from 'src/app/models/post.model';
import { Recruitments } from 'src/app/models/recruitments.models';
import { TransmitToPost } from 'src/app/models/transmit-to-post.models';
import { ListPostService } from 'src/app/services/list-post.service';
import { RecruitmentsService } from 'src/app/services/recruitments.service';

@Component({
  selector: 'app-recruitment-detail',
  templateUrl: './recruitment-detail.component.html',
  styleUrls: ['./recruitment-detail.component.css']
})
export class RecruitmentDetailComponent implements OnInit {
  recruitmentDetail : Recruitments;
  statusListCapacity : boolean = false;
  recruitmentCapacity : Array<Capacity>;
  cinfigData: TransmitToPost;
  listPostResult : Array<Post>;
  

  constructor(private route: ActivatedRoute ,
    public postService:  ListPostService,
    private recruitmentService: RecruitmentsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.recruitmentService.getRecruitmentDetail(id))
    )
    .subscribe(res => {
      if(res.status){
        this.recruitmentCapacity = res.payload.contest;
        this.recruitmentCapacity ? this.statusListCapacity = true : this.statusListCapacity;
        this.recruitmentDetail = res.payload;
      }
    })

    this.getListPost();
  }

// List Posts
  getListPost() {
    this.postService.getPostWhereCate('post-recruitment').subscribe(res => {
     if(res.status){
       this.listPostResult = res.payload.data;
       this.cinfigData = {
         id: 0,
         posts: this.listPostResult,
         numberColumn: 4,
       };

     }
   })
  }

  // Open-model-dang-nhap
  openModalLogin(){
    const dialogRef = this.dialog.open(ModalUploadCvComponent, {
      width: '700px',
      data:{
        recruitment: this.recruitmentDetail
      }
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
