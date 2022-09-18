import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  keywordQuery: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postService: ListPostService
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      keyword: [null, [Validators.required]],
    });
    this.keywordQuery = this.route.snapshot.queryParamMap.get('keyword')
    this.inputKeyword = this.keywordQuery;

    // search
    this.search()
  }

  // tìm kiếm
  search() {
    // if (this.validateForm.valid) {
    this.router.navigateByUrl(`/tim-kiem/bai-viet?keyword=${this.inputKeyword}`);
    this.postService.searchPost(this.inputKeyword).subscribe(res => {
      this.results = res.payload.data;
    })
    // } else {
    //   Object.values(this.validateForm.controls).forEach(control => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  // tìm kiếm khi từ trang khác và trên url
  searchPost() {
    this.results = null

    this.keywordQuery = this.route.snapshot.queryParamMap.get('keyword')

    // search
    if (this.validateForm.valid) {
      this.router.navigateByUrl(`/tim-kiem/bai-viet?keyword=${this.inputKeyword}`);
      this.postService.searchPost(this.inputKeyword).subscribe(res => {
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
