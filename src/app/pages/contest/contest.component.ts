import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
import { MajorService } from 'src/app/services/major.service';
import { map, switchMap } from 'rxjs';
import { Team } from 'src/app/models/team';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  status: string = 'pending';
  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;
  major_slug: any = '';
  major_id: any;
  contests: Array<Contest> = [];
  majorItem: Array<Contest> = [];
  majors: Array<any> = []

  formSearch = new FormGroup({
    keyword: new FormControl()
  })

  constructor(private contestService: ContestService, private route: ActivatedRoute, private majorService: MajorService) {
  }

  x = setInterval(() => {
    let futureDate = new Date("Apr 30, 2022 15:24:35").getTime();
    let today = new Date().getTime();
    let distance = futureDate - today;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);


  ngOnInit(): void {
    // Get id
    this.route.paramMap.subscribe(params => {
      this.major_slug = params.get('slug');
      this.majorService.getMajorWhereSlug(this.major_slug).subscribe(res => {
        console.log(this.major_slug);

        if (this.major_slug == null) {
          // this.status = 'pending'
          this.getAllContest();
        } else {
          this.major_id = res.payload.id;

          this.contestService.getWhereMajor(this.major_id).subscribe(res => {
            this.contests = res.payload;
            if (this.contests) {
              this.status = 'done';
            } else {
              this.status = 'pending';
            }
          })
        }
      })
    });

    // Gọi tất cả chuyên ngành
    this.majorService.getAll().subscribe(res => {
      if (res.status == true) {
        this.majors = res.payload.data;
        if (this.majors) {
          this.status = 'done';
        };
      };
      // console.log(this.majors);
    })
  }

  getAllContest() {
    this.contestService.getAll().subscribe(res => {
      this.contests = res.payload;
    })
  }

  // Tìm kiếm cuộc thi
  searchContest() {
    let keyword = { ...this.formSearch.value }
    // console.log(res);

    this.contestService.searchContest(keyword.keyword).subscribe(res => {
      this.contests = res.payload;
      // console.log(res);
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
  statusContest(e: any) {
    let status = e.target.value;
    if (status == 0) {
      this.getAllContest();
    }
    this.contestService.getWhereStatus(status).subscribe(res => {
      this.contests = res.payload;
    })
  }
}
