import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ListPostService } from 'src/app/services/list-post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postDetail!: Post;

  constructor(
    private postService: ListPostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('slug')),
      switchMap(slug => this.postService.getPostBySlug(slug))
    ).subscribe(res => {
      if (res.status) {
        this.postDetail = res.payload;
        console.log(res.payload)
      }
    })
  }

}
