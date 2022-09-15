import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ListPostService } from 'src/app/services/list-post.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {
  ListPost: Post[]

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
    this.getListPost()
  }

  getListPost(){
    this.postService.getPostRecruitment().subscribe(res => {
       if(res.status){
        this.ListPost = res.payload.data
       }
    })
  }

  getListPostRecruitment(){
    this.postService.getPostRecruitment().subscribe(res => {
       if(res.status){
        let arrResult= res.payload.data;
        this.PostRecruitmentFirst = arrResult[0];
        // let indexRan = Math.floor(Math.random() * arrResult.length ) +1;
        // this.postSeccond = arrResult[indexRan];
        this.ListPostRecruitment = arrResult.filter((res: Post , index: number) => {
          return index > 0 && index < 3;
        });
       }
    })
  }

  getListPostContest(){
    this.postService.getPostContest().subscribe(res => {
       if(res.status){
        let arrResult= res.payload.data;
        this.PostContestFirst = arrResult[0];
        // let indexRan = Math.floor(Math.random() * arrResult.length ) +1;
        // this.postSeccond = arrResult[indexRan];
        this.ListPostContest = arrResult.filter((res: Post , index: number) => {
          return index > 0;
        });
       }
    })
  }

  getListPostCapacity(){
    this.postService.getPostCapacity().subscribe(res => {
       if(res.status){
        let arrResult= res.payload.data;
        this.PostCapacityFirst = arrResult[0];
        // let indexRan = Math.floor(Math.random() * arrResult.length ) +1;
        // this.postSeccond = arrResult[indexRan];
        this.ListPostCapacity = arrResult.filter((res: Post , index: number) => {
           return index > 0 && index < 4;
        });
       }
    })
  }

  getPostWhereCate(cate: string ,elementString: any, distanceApart: number){
    let element = document.querySelector(elementString);
    let numberScroll = element.offsetTop;
    window.scrollTo({ top: numberScroll - distanceApart, behavior: 'smooth' });
    this.postService.getPostWhereCate(cate).subscribe(res => {
      console.log(res.payload.data);
    });
  }

  sliderHeaderPost = {
    "slidesToShow": 2 , infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000,
  }

}
