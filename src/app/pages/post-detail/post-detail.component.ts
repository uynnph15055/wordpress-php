import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ListPostService } from 'src/app/services/list-post.service';
import { Post } from 'src/app/models/post.model';
import { ModalUploadCvComponent } from 'src/app/modal/modal-upload-cv/modal-upload-cv.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postDetail!: Post;
  statusPost: boolean = false;

  constructor(
    private postService: ListPostService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('slug')),
      switchMap(slug => this.postService.getPostBySlug(slug))
    ).subscribe(res => {
      if (res.status) {
        this.postDetail = res.payload;
        (this.postDetail.postable_type === "App\\Models\\Contest") ? this.postDetail.postable_type = "Cuộc thi" :
          (this.postDetail.postable_type === "App\\Models\\Recruitment") ? this.postDetail.postable_type = "Tuyển dụng" :
            this.postDetail.postable_type = "Test năng lực"
        this.postDetail ? (this.statusPost = true) : this.statusPost;
      }
    })
  }

  // Open-modal upload cv
  openModal() {
    const dialogRef = this.dialog.open(ModalUploadCvComponent, {
      width: '700px',
      data: {
        // recruitment: this.recruitmentDetail
      }
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }
}
