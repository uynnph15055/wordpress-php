import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-related-item',
  templateUrl: './post-related-item.component.html',
  styleUrls: ['./post-related-item.component.css']
})
export class PostRelatedItemComponent implements OnInit {

  @Input() postItem!: Post; 

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
     
  }

}
