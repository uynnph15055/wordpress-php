import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Major } from 'src/app/models/major';
import { PayingLinks } from 'src/app/models/paying-links';
import { Post } from 'src/app/models/post.model';
import { ConfigFunctionService } from 'src/app/services/config-function.service';
import { ListPostService } from 'src/app/services/list-post.service';
import { MajorService } from 'src/app/services/major.service';
import { SkillServiceService } from 'src/app/services/skill-service.service';

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

  // -------------
  statusCompany: boolean = false;

  statusResultPostFilter: boolean = false;
  statusPostHot: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postService: ListPostService,
    public dialog: MatDialog,
    public listPostService: ListPostService,
    public majorService: MajorService,
    public configService: ConfigFunctionService,
    public skillService: SkillServiceService
  ) {
  }

  catePosts: Array<any> = [
    {
      prams: 'post-contest',
      name: 'Bài Viết Thuộc Cuộc Thi',
    },
    {
      prams: 'post-capacity',
      name: 'Bài Viết Thuộc Test Năng Lực',
    },
    {
      prams: 'post-recruitment',
      name: 'Bài Viết Thuộc Tuyển Dụng',
    }
  ];

  statusFilter: Array<any> = [
    {
      prams: 'normal',
      name: 'Mới nhất',
    },
    {
      prams: 'hot',
      name: 'Hot nhất',
    },
  ];

  formFilter = new FormGroup({
    filterSkill: new FormControl(''),
    filterKeyword: new FormControl(''),
    filterPost: new FormControl(''),
    filterStatus: new FormControl(''),
  });

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
    this.router.navigateByUrl(`/tim-kiem/bai-viet?keyword=${this.inputKeyword}`);
    this.postService.searchPost(this.inputKeyword).subscribe(res => {
      this.results = res.payload.data;
    })
  }


  // =======================Filter============================
  // Set filter value
  setValueFilterPost(item: Major) {
    this.formFilter.controls['filterPost'].setValue(item.name);
  }

  // Set filter status
  setValueStatus(status: string) {
    this.formFilter.controls['filterStatus'].setValue(status);
  }

  // Set keyword recruitments
  setValueKeyword(event: any) {
    this.formFilter.controls['filterKeyword'].setValue(event.target.value);
  }

  // Filter recruitments
  filterRecruitments() {
    this.statusResultPostFilter = false;
    this.keywordQuery = this.route.snapshot.queryParamMap.get('keyword')
    let catePost;
    let status;
    let keyword = '';

    if (this.formFilter.controls['filterKeyword'].value) {
      keyword = this.formFilter.controls['filterKeyword'].value;
    }

    if (this.formFilter.controls['filterPost'].value) {
      catePost = this.catePosts.filter(
        (item) => item.name === this.formFilter.controls['filterPost'].value
      )[0].prams;
    }


    if (this.formFilter.controls['filterStatus'].value) {
      status = this.statusFilter.filter(
        (item) => item.name === this.formFilter.controls['filterStatus'].value
      )[0].prams;
    }

    this.router.navigateByUrl(`/tim-kiem/bai-viet?keyword=${keyword}&type=${catePost}&status=${status}`);

    this.listPostService
      .filterPost(keyword, catePost, status)
      .subscribe((res) => {
        if (res.status) {
          this.statusResultPostFilter = true;
          this.results = res.payload.data;
        }
      });
  }

}
