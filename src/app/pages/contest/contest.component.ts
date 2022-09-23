import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Contest } from 'src/app/models/contest';
import { Major } from 'src/app/models/major';
import { ContestService } from 'src/app/services/contest.service';
import { MajorService } from 'src/app/services/major.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css'],
})
export class ContestComponent implements OnInit {
  majors: Array<Major>;
  major_id: number;
  contests: Array<Contest> = [];
  keyworkSearchContest: string;
  orderObj: any;
  statusContest: boolean = false;
  statusMajor: boolean = false;
  checkUserHasLogin: boolean = false;
  statusCurrContest: number = 1;

  constructor(
    public majorService: MajorService,
    public contestService: ContestService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  formSearchMajor = new FormGroup({
    keywordMajor: new FormControl(''),
  });

  formSearchContest = new FormGroup({
    keywordContest: new FormControl(''),
  });

  ngOnInit(): void {
    this.userService.getUserValue().id != undefined
      ? this.getContestHasAfterLogin()
      : this.getAllContest();

    this.route.queryParamMap.subscribe((params) => {
      this.orderObj = {...params };
    });

    this.keyworkSearchContest = this.orderObj.params.keyword;
    this.majorService.getMajorWhereSlug( this.orderObj.params.major_id).subscribe((res) => {
      this.statusContest = false;
      this.major_id = res.payload.id;

    });
    this.statusCurrContest = this.orderObj.params.status;

     this.filterContest(this.keyworkSearchContest ,  this.major_id , this.statusCurrContest);

    this.titleService.setTitle('Cuộc thi');
    this.checkUserHasLogin;

    window.addEventListener('scroll', this.scrollNavSub);
  }

  scrollNavSub() {
    let element = document.querySelector('.contest__nav');
    if (window.scrollY > 600) {
      element?.classList.add('fixed-nav');
    } else {
      element?.classList.remove('fixed-nav');
    }
  }

  // Get contest where major_slug
  getContestWhereSlug() {
    this.route.paramMap.subscribe((params) => {
      let slug: any = params.get('slug');
      if (!null) {
      } else {
        
      }
    });
  }

  // Tìm kiếm chuyên ngành
  searchMajor() {
    this.statusMajor = false;
    this.majorService
      .searchMajor(this.formSearchMajor.controls['keywordMajor'].value)
      .subscribe((res) => {
        if (res.status) {
          this.majors = res.payload;
          this.statusMajor = true;
        }
      });
  }

  // Tìm kiếm cuộc thi
  searchContest() {
    this.statusContest = false;
    this.keyworkSearchContest =
      this.formSearchContest.controls['keywordContest'].value;
    console.log(this.keyworkSearchContest);
    this.filterContest(
      this.keyworkSearchContest,
      this.major_id,
      this.statusCurrContest
    );
  }

  // Get contest after login
  getContestHasAfterLogin() {
    this.userService.getListContestHasJoin(1, 'desc').subscribe((res) => {
      res.status ? (this.contests = res.payload.data) : null;
    });
  }

  // Gọi tất cả chuyên ngành
  getAllMajor() {
    this.majorService.getAll().subscribe((res) => {
      if (res.status) {
        this.majors = res.payload;
        this.statusMajor = true;
      }
    });
  }

  // get all contest not login
  getAllContest() {
    this.contestService.getAll().subscribe((res) => {
      if (res.payload) {
        this.contests = res.payload.data;
        this.statusContest = true;
      }
    });
  }

  // Update status  contest
  updateStatusContest(event: any, status: number) {
    this.statusCurrContest = status;
    // window.location.search = jQuery.query.set("rows", 10);
    const statusAll = document.querySelectorAll('.contest__nav-item');
    for (let i = 0; i < statusAll.length; i++) {
      statusAll[i]?.classList.remove('active');
    }

    this.filterContest(
      this.keyworkSearchContest,
      this.major_id,
      this.statusCurrContest
    );
    event.currentTarget.classList.add('active');
  }

  // Function dùng chung để lọc sản phẩm
  filterContest(keyword: string, major_id: any, status: any) {
    this.statusContest = false;
    this.router.navigate(['/cuoc-thi'], {
      queryParams: { status: status, keyword: keyword, major_id: major_id },
      queryParamsHandling: 'merge',
    });
    if (!this.checkUserHasLogin) {
      this.contestService
        .filterContest(keyword, major_id, status)
        .subscribe((res) => {
          if (res.status) this.contests = res.payload.data;
          this.statusContest = true;
        });
    } else {
      this.userService
        .filterContestHasLogin(keyword, major_id, status)
        .subscribe((res) => {
          if (res.status) this.contests = res.payload.data;
          this.statusContest = true;
        });
    }
  }
}
