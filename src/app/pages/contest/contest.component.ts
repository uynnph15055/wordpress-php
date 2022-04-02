import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  status: string = 'pending';
  major_slug: any = '';
  major_id: any = '';
  contests: Array<Contest> = [];
  majorItem: Array<Contest> = [];
  majors: Array<any> = [
    {
      'id': 5,
      'name': 'Thiết kế web',
      'slug': 'thiet-ke-web',
    },
    {
      'id': 7,
      'name': 'Thiết kế đồ họa',
      'slug': 'thiet-ke-do-hoa',
    },
    {
      'id': 8,
      'name': 'Quản trị khách sạn',
      'slug': 'quan-tri-khach-san',
    },
    {
      'id': 9,
      'name': 'Lập trình máy tính',
      'slug': 'lap-trinh-may-tinh',
    },
    {
      'id': 10,
      'name': 'Ứng dụng phần mềm',
      'slug': 'ung-dung-phan-mem',
    }
  ]

  constructor(private contestService: ContestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.major_slug = params.get('slug')
      this.majorItem = this.majors.filter(res => {
        return this.major_slug == res.slug;
      });
      this.major_id = this.majorItem[0].id;
    });

    if (this.major_slug != null) {
      this.contests = [];
      this.contestService.getWhereMajor(this.major_id).subscribe(res => {
        this.contests = res.payload;
        if (this.contests) {
          this.status = 'done';
        }
      })
    } else {
      this.contestService.getWhereStatus(1).subscribe(resp => {
        this.contests = resp.payload;
        if (this.contests) {
          this.status = 'done';
        }
      });
    }
  }

  // Lọc theo chuyên ngành
  filterContestMajor(major_id: number) {
    this.contestService.getWhereMajor(major_id).subscribe(res => {
      this.contests = res.payload;
    });
  }
}
