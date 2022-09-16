import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-item-search',
  templateUrl: './post-item-search.component.html',
  styleUrls: ['./post-item-search.component.css']
})
export class PostItemSearchComponent implements OnInit {
  @Input() item!: Post
  constructor() { }

  ngOnInit(): void {
  }

}
