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
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})

export class ContestComponent implements OnInit {
  statusMajor: string = 'pending';
  statusContest: string = 'pending';
  checkUserHasLogin: boolean;
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
  loggedInUser: User;

  formSearch = new FormGroup({
    keyword: new FormControl()
  })

  constructor(private contestService: ContestService,
    private route: ActivatedRoute,
    private majorService: MajorService,
    private toast: NgToastService,
    private UserService: UserService) {
  }


  ngOnInit(): void {
    this.UserService.getUserValue().id !== undefined ? this.checkUserHasLogin = true : this.checkUserHasLogin;
    $('html , body').animate({
      scrollTop: 0
    }, 1000);
    // Get id
    this.route.paramMap.subscribe(params => {
      this.major_slug = params.get('slug');
      this.majorService.getMajorWhereSlug(this.major_slug).subscribe(res => {

        if (this.major_slug == null) {
          this.checkUserHasLogin == true ? this.getContestHasAfterLogin() : this.getAllContest();
        } else {
          this.contests = [];
          this.statusContest = 'pending';
          this.major_id = res.payload.id;
          this.filterContest('', this.major_id, 0, this.checkUserHasLogin)
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

  // get all contest not login 
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

  //   Set value need search
  setValueSearch(event: any) {
    this.valueSearch = event.target.value;

  }

  // Tìm kiếm cuộc thi
  searchContest() {
    this.contests = [];
    this.statusContest = 'pending';
    this.filterContest(this.valueSearch, this.major_id, 0, this.checkUserHasLogin);
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
        this.filterContest(this.valueSearch, this.major_id, statusMajor, this.checkUserHasLogin);
      } else {
        this.filterContest(this.valueSearch, 0, statusMajor, this.checkUserHasLogin);
      }
    }
    else {
      if (this.major_id) {
        this.filterContest(this.valueSearch, this.major_id, statusMajor, this.checkUserHasLogin)
      } else {
        this.filterContest(this.valueSearch, 0, statusMajor, this.checkUserHasLogin)
      }
    }
  }
  // Filter where major
  getWhereMajor() {
    this.filterContest('', this.major_id, 0, this.checkUserHasLogin);
  }

  // Edit array page paying
  changeArrayLinks(links: Array<any>) {
    for (let index = 0; index < links.length; index++) {
      links[0].label = '';
      links[links.length - 1].label = '';
    }
  }

  // Get contest after login
  getContestHasAfterLogin() {
    this.contestService.getListContestHasJoin().subscribe(res => {
      res.status ?
        this.contests = res.payload.data : null;
      this.contests ? this.statusContest = 'done' : this.statusContest == 'pending';
    })
  }


  // Function dùng chung để lọc sản phẩm
  filterContest(keyword: string, major_id: number, status: number, statusUser: boolean) {
    this.statusContest = 'pending';
    if (statusUser == false) {
      this.contestService.filterContest(keyword, major_id, status).subscribe(res => {
        if (res.status)
          this.contests = res.payload.data;
        this.contests ? this.statusContest = 'done' : this.statusContest;
      })
    } else {
      this.contestService.filterContestHasLogin(keyword, major_id, status).subscribe(res => {
        if (res.status)
          this.contests = res.payload.data;
        this.contests ? this.statusContest = 'done' : this.statusContest;
      })
    }

  }


  // Gọi các cuộc thi theo id chuyên ngành khi responsive
  getContestWWhereIdMajor(event: any) {
    this.statusContest = 'pending';
    let major_id = event.target.value;
   

    if (major_id == 0) {
      this.ngOnInit();
    } else {
      this.filterContest('', major_id, 0, this.checkUserHasLogin);
    }
  }
}
