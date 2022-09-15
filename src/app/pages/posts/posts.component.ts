import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ListPostService } from 'src/app/services/list-post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:  Post[];
  listPostNewFirst : Post; 
  postSeccond: Post; 
  constructor(private postService : ListPostService) { }

  ngOnInit(): void {
    this.getListPost();
  }

  getListPost(){
    this.postService.getAllListPost().subscribe(res => {
       if(res.status){
        let arrResult= res.payload.data;
        this.listPostNewFirst = arrResult[0];
        let indexRan = Math.floor(Math.random() * arrResult.length ) +1;
        
        this.postSeccond = arrResult[indexRan];
        this.posts = arrResult.filter((res: Post , index: number) => {
          return index > 1;
        });
       }

      // console.log(this.listPostNewFirst);
      
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
