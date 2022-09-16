import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { ListPostService } from 'src/app/services/list-post.service';

@Component({
  selector: 'app-post-result-search',
  templateUrl: './post-result-search.component.html',
  styleUrls: ['./post-result-search.component.css']
})
export class PostResultSearchComponent implements OnInit {
  results: Post[] | null
  validateForm!: FormGroup;
  inputKeyword: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postService: ListPostService
  ) {
    this.getList()
   }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      keyword: [null, [Validators.required]],
    });

  }

  getList(){
    this.postService.getAllListPost().subscribe(res => {
      this.results = res.payload.data;
    })
  }

  // tìm kiếm
  searchPost() {
    this.results = null
    if (this.validateForm.valid) {
      this.router.navigateByUrl(`/tim-kiem/bai-viet?keyword=${this.inputKeyword}`);
      this.postService.searchPost(this.inputKeyword).subscribe(res=>{
        this.results = res.payload.data;
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
