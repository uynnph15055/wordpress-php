import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ListPostService } from 'src/app/services/list-post.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {
  ListPost: Post[] | null


  constructor(private postService : ListPostService) { }

  ngOnInit(): void {
    this.getListPost()
  }

  getListPost(){
    this.postService.getPostRecruitment().subscribe(res => {
       if(res.status){
        this.ListPost = res.payload.data
       }
    })
  }
  onChangeDataPost(data: string){
    this.ListPost = null
        this.postService.getPostByCategory(data).subscribe(res => {
        if(res.status){
          this.ListPost = res.payload.data
        }
      })
   
  }
 
}
