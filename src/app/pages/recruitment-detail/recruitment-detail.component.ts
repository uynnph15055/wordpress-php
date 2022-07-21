import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Capacity } from 'src/app/models/capacity';
import { Contest } from 'src/app/models/contest';
import { Recruitments } from 'src/app/models/recruitments.models';
import { RecruitmentsService } from 'src/app/services/recruitments.service';

@Component({
  selector: 'app-recruitment-detail',
  templateUrl: './recruitment-detail.component.html',
  styleUrls: ['./recruitment-detail.component.css']
})
export class RecruitmentDetailComponent implements OnInit {
  recruitmentDetail : Recruitments;
  recruitmentCapacity : Array<Capacity>;

  constructor(private route: ActivatedRoute ,
    private recruitmentService: RecruitmentsService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.recruitmentService.getRecruitmentDetail(id))
    )
    .subscribe(res => {
      if(res.status){
        this.recruitmentCapacity = res.payload.contest;
        this.recruitmentDetail = res.payload;
      }
    })
  }
}
