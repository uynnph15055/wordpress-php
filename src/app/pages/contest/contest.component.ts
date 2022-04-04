import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
import { MajorService } from 'src/app/services/major.service';
import { map, switchMap } from 'rxjs';
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
  majors: Array<any> = []

  constructor(private contestService: ContestService, private route: ActivatedRoute, private majorService: MajorService) {

  }

  ngOnInit(): void {
    // Get id
    this.route.paramMap.pipe(
      map((params: any) => params.get('slug')),
      switchMap((slug: string) => this.majorService.getMajorWhereSlug(slug))
    ).subscribe(res => {
      this.major_id = res.payload.id;
      console.log(this.major_id);
    })


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

    if (this.major_id == '') {
      this.contestService.getAll().subscribe(res => {
        this.contests = res.payload;
        if (this.contests) {
          this.status = 'done';
        }
      })
    } else {
      this.contestService.getWhereMajor(this.major_id).subscribe(res => {
        this.contests = res.payload;
        if (this.contests) {
          this.status = 'done';
        }
      })
    }
  }
}
