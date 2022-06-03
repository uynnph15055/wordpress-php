import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
import { MajorService } from 'src/app/services/major.service';
import { map, switchMap } from 'rxjs';
import { Team } from 'src/app/models/team';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import * as moment from 'moment/moment';
import { ConfigFunctionService } from 'src/app/services/config-function.service';
import { Major } from 'src/app/models/major';
@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  statusMajor: string = 'pending';
  statusContest: string = 'pending';
  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  array_page_link: Array<any> = [];
  seconds: number = 25;
  statusContestFilter: number;
  major_slug: any = '';
  major_id: any;
  contests: Array<Contest> = [];
  majorItem: Array<Contest> = [];
  majors: Array<Major> = [];
  valueSearch: string;

  formSearch = new FormGroup({
    keyword: new FormControl()
  })

  constructor(private contestService: ContestService,
    private route: ActivatedRoute,
    private majorService: MajorService,
    private toast: NgToastService) {
  }


  ngOnInit(): void {
    $('html , body').animate({
      scrollTop: 0
    }, 1000);
    // Get id
    this.route.paramMap.subscribe(params => {
      this.major_slug = params.get('slug');
      this.majorService.getMajorWhereSlug(this.major_slug).subscribe(res => {

        if (this.major_slug == null) {
          // this.statusMajor = 'pending'
          this.getAllContest();
        } else {
          this.contests = [];
          this.statusContest = 'pending';
          this.major_id = res.payload.id;
          this.filterContest('', this.major_id, 0)
        }
      })
    });

    // Gọi tất cả chuyên ngành
    this.majorService.getAll().subscribe(res => {
      if (res.status) {
        this.majors = res.payload;
        if (this.majors) {
          this.statusMajor = 'done';
        };
      };

    })
  }

  // Phân trang
  getContestWherePage(url: string) {
    this.contests = [];
    this.statusContest = 'pending';
    this.contestService.getContestWherePage(url).subscribe(res => {
      this.contests = res.payload.data;
      this.array_page_link = res.payload.links;
      this.changeArrayLinks(this.array_page_link);
      if (this.contests) {
        this.statusContest = 'done';
      }
    })
  }

  getAllContest() {
    this.contestService.getAll().subscribe(res => {
      this.contests = res.payload.data;
      this.array_page_link = res.payload.links;
      this.changeArrayLinks(this.array_page_link);
      if (this.contests) {
        this.statusContest = 'done';
      }
    })
  }

  setValueSearch(event: any) {
    this.valueSearch = event.target.value;
  }

  // Tìm kiếm cuộc thi
  searchContest() {
    this.contests = [];
    this.statusContest = 'pending';
    this.filterContest(this.valueSearch, this.major_id, 0);
  }

  // Điểm số người tham gia
  getMembers(teams: Array<Team> = []): number {
    let totalMember = 0;
    teams.forEach(t => {
      if (t.members != undefined) {
        totalMember += t.members.length;
      }
    });
    return totalMember;
  }

  // Lọc theo trạng thái
  statusMajorContest(e: any) {
    this.statusContest = 'pending';
    let statusMajor = e.target.value;
    if (statusMajor == 0) {
      if (this.major_id) {
        this.filterContest('', this.major_id, statusMajor);
      } else {
        this.filterContest('', 0, statusMajor);
      }
    }
    else {
      if (this.major_id) {
        this.filterContest('', this.major_id, statusMajor)
      } else {
        this.filterContest('', 0, statusMajor)
      }
    }
  }


  getWhereMajor() {
    this.filterContest('', this.major_id, 0);
  }

  changeArrayLinks(links: Array<any>) {
    for (let index = 0; index < links.length; index++) {
      links[0].label = '';
      links[links.length - 1].label = '';
    }
  }

  filterContest(keyword: string, major_id: number, status: number) {
    this.statusContest = 'pending';
    this.contestService.filterContest(keyword, major_id, status).subscribe(res => {
      if (res.status)
        setTimeout(() => {
          this.contests = res.payload.data;
          this.contests ? this.statusContest = 'done' : this.statusContest;
        }, 2000);
    })
  }
}
