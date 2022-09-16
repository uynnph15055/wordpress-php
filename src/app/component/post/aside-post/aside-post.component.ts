import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { ListPostService } from 'src/app/services/list-post.service';

@Component({
  selector: 'app-aside-post',
  templateUrl: './aside-post.component.html',
  styleUrls: ['./aside-post.component.css']
})
export class AsidePostComponent implements OnInit {
  validateForm!: FormGroup; 
  resultsSearch: Post[] = [];
  inputKeyword: string;

  constructor(
    private postService: ListPostService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      keyword: [null, [Validators.required]],
    });
  }

  // tìm kiếm
  searchPost() {  
    console.log("firstabc", this.inputKeyword)
    if (this.validateForm.valid) {
      this.postService.searchPost(this.inputKeyword).subscribe(data => {
        this.resultsSearch = data.payload.data;
        console.log("first", this.resultsSearch)
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }    
  }
  
}
