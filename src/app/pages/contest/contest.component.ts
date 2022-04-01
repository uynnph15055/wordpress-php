import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { Contest } from 'src/app/models/contest';
@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  major_slug: any;
  major_id: any;
  contests: Array<Contest> = [];
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

  constructor(private contestService: ContestService) { }

  ngOnInit(): void {
    this.contestService.getWhereStatus(1).subscribe(resp => {
      this.contests = resp.payload;
    });
  }


  // Lọc theo chuyên ngành
  filterContestMajor(major_id: number) {
    this.contestService.getWhereMajor(major_id).subscribe(res => {
      this.contests = res.payload;
    });
  }

}
