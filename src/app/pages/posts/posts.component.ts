import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ListPostService } from 'src/app/services/list-post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  PostRecruitmentFirst : Post; 
  ListPostRecruitment: Post[]

  PostContestFirst : Post; 
  ListPostContest: Post[]

  PostCapacityFirst : Post; 
  ListPostCapacity: Post[]

  constructor(private postService : ListPostService) { }

  ngOnInit(): void {
    this.getListPostRecruitment();
    this.getListPostCapacity()
    this.getListPostContest()
  }


  getListPostRecruitment(){
    this.postService.getPostByCategory("post-recruitment").subscribe(res => {
       if(res.status){
        let arrResult= res.payload.data;
        this.PostRecruitmentFirst = arrResult[0];
        this.ListPostRecruitment = arrResult.filter((res: Post , index: number) => {
          return index <= 2;
        });
       }
    })
  }

  getListPostContest(){
    this.postService.getPostByCategory("post-contest").subscribe(res => {
       if(res.status){
        let arrResult= res.payload.data;
        this.PostContestFirst = arrResult[0];
        this.ListPostContest = arrResult.filter((res: Post , index: number) => {
          return index <= 2;
        });
       }
    })
  }

  getListPostCapacity(){
    this.postService.getPostByCategory("post-capacity").subscribe(res => {
       if(res.status){
        let arrResult= res.payload.data;
        this.PostCapacityFirst = arrResult[0];
        this.ListPostCapacity = arrResult.filter((res: Post , index: number) => {
           return  index <= 2;
        });
       }
    })
  }


  sliderHeaderPost = {
    "slidesToShow": 2 , infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000,
  }
}
