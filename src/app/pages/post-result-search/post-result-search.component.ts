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
    this.getList()
   }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      keyword: [null, [Validators.required]],
    });
    this.keywordQuery = this.route.snapshot.queryParamMap.get('keyword')
  }

  getList(){
    this.postService.getAllListPost().subscribe(res => {
      this.results = res.payload.data;
    })
  }

  // tìm kiếm
  searchPost() {
    this.results = null
    this.keywordQuery = this.route.snapshot.queryParamMap.get('keyword')
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
