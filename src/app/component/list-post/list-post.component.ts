import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { TransmitToPost } from 'src/app/models/transmit-to-post.models';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  @Input() listPost : TransmitToPost;
  constructor() { }

  posts: Array<Post>;
  sliderPostNew = {};
  
  ngOnInit(): void {
    this.posts = this.listPost.posts;
    // -----------
    this.sliderPostNew = {
      "slidesToShow": 4, infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 586,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  
  }

}
