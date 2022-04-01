import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';

@Component({
  selector: 'app-contest-deatail',
  templateUrl: './contest-deatail.component.html',
  styleUrls: ['./contest-deatail.component.css'],
})


export class ContestDeatailComponent implements OnInit {
  forwardComponent: Array<any> = [];
  contestDetail: Array<Contest> = [];
  contentItem: Array<Contest> = [];
  closeResult: string;
  display = '';
  contest_id: any = 0;

  constructor(private route: ActivatedRoute, private contestService: ContestService) { }

  roundDetailNow() {
    this.display = 'block';
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.contestService.getWhereId(id))
    ).subscribe(res => {
      if (res.status == true) {
        this.contestDetail = res.payload;
      }
    })
  }




}
