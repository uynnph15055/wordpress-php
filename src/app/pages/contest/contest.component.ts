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
  major_slug: any = '';
  major_id: any;
  contests: Array<Contest> = [];
  majorItem: Array<Contest> = [];
  majors: Array<any> = [];
  item: Contest;

  formSearch = new FormGroup({
    keyword: new FormControl()
  })

  constructor(private contestService: ContestService,
    private route: ActivatedRoute,
    private majorService: MajorService,
    private toast: NgToastService,
    private configFuctionDate: ConfigFunctionService) {
  }


  ngOnInit(): void {

    // Get id
    this.route.paramMap.subscribe(params => {
      this.major_slug = params.get('slug');
      this.majorService.getMajorWhereSlug(this.major_slug).subscribe(res => {

        if (this.major_slug == null) {
          // this.statusMajor = 'pending'
          this.getAllContest();
        } else {
          this.contests = [];
          this.toast.warning({ summary: 'Đang tải dữ liệu ...', duration: 5000 });
          this.statusContest = 'pending';
          this.major_id = res.payload.id;
          this.getWhereMajor(this.major_id);
        }
      })
    });

    // Gọi tất cả chuyên ngành
    this.majorService.getAll().subscribe(res => {
      if (res.status == true) {
        this.majors = res.payload;
        if (this.majors) {
          this.statusMajor = 'done';
        };
      };

    })
  }

  // Lọc theo trạng thái
  filterContestWithStatus(e: any) {
    this.contests = [];

    this.statusContest = 'pending';
    this.toast.warning({ summary: 'Đang tải dữ liệu , xin đợi giây lát ...', duration: 5000 });
    let status = e.target.value;
    if (status == 0) {
      this.getWhereMajor(this.major_id);
    }
    if (this.major_id == undefined) {
      this.contestService.getWhereStatus(status).subscribe(res => {
        this.contests = res.payload.data;
        if (this.contests.length > 0) {
          this.statusContest = 'done';
        } else {
          this.toast.warning({ summary: 'Trạng thái này không có cuộc thi nào ', duration: 5000 });
          this.statusContest = 'done';
        }
      })

    } else {
      this.contestService.getWhereStatusAndMajor(status, this.major_id).subscribe(res => {
        this.contests = res.payload.data;
        if (this.contests.length > 0) {
          this.statusContest = 'done';
        } else {
          this.toast.warning({ summary: 'Trạng thái này không có cuộc thi nào ', duration: 5000 });
          this.statusContest = 'done';
        }
      })
    }
  }

  // Phân trang
  getContestWherePage(url: string) {
    this.contests = [];
    this.toast.warning({ summary: 'Đang tải dữ liệu , xin đợi giây lát ...', duration: 5000 });
    this.statusContest = 'pending';
    this.contestService.getContestWherePage(url).subscribe(res => {
      this.contests = res.payload.data;
      console.log(this.contests);

      this.array_page_link = res.payload.links;
      if (this.contests) {
        this.statusContest = 'done';
      }
    })
  }

  getAllContest() {
    this.contestService.getAll().subscribe(res => {
      this.contests = res.payload.data;
      this.array_page_link = res.payload.links;
      if (this.contests) {
        console.log(this.contests);
        this.statusContest = 'done';
      }
    })
  }

  // Tìm kiếm cuộc thi
  searchContest(e: any) {
    this.contests = [];
    this.toast.warning({ summary: 'Đang tải dữ liệu , xin đợi giây lát ...', duration: 5000 });
    this.statusContest = 'pending';
    let keyword = e.target.value;


    this.contestService.searchContest(keyword).subscribe(res => {
      this.contests = res.payload.data;

      if (this.contests) {
        this.statusContest = 'done';
      }
    });
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
    let statusMajor = e.target.value;
    if (statusMajor == 0) {
      this.getAllContest();
    }
    this.contestService.getWhereStatus(statusMajor).subscribe(res => {
      this.contests = res.payload;
      if (this.contests) {
        this.statusContest = 'done';
      }
    })
  }

  // Mở form search
  formSearchOpen() {
    // alert('Uy nguyễn ')
    let formBox = document.querySelector('.header-form-search');

    console.log(formBox);

    formBox?.classList.toggle('max-with');
  }

  getWhereMajor(major_id: number) {
    this.contestService.getWhereMajor(this.major_id).subscribe(res => {
      this.contests = res.payload.data;
      if (this.contests.length > 0) {
        this.statusContest = 'done';
      } else {
        this.toast.warning({ summary: 'Chuyên ngành này chưa có cuộc thi nào', duration: 5000 });
        this.statusContest = 'done';
      }
    })
  }

  // Đóng formSearch
  formSearchClose() {
    // alert('Uy nguyễn ')
    let formBox = document.querySelector('.header-form-search');


    formBox?.classList.remove('max-with');
  }
}
