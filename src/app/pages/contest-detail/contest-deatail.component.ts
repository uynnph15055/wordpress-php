import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';

@Component({
  selector: 'app-contest-deatail',
  templateUrl: './contest-deatail.component.html',
  styleUrls: ['./contest-deatail.component.css'],
})


export class ContestDeatailComponent implements OnInit {
  forwardComponent: Array<any> = [];
  contestDetail: Contest;
  contestRelated: Array<any>;
  statusContestRelated: boolean = false;
  contentItem: Array<Contest> = [];
  closeResult: string;
  status: any = 'pending';
  routeStateRegister: any = false;
  contest_id: any = 0;

  sliderSupporter = { "slidesToShow": 3, infinite: true, autoplay: true, arrows: true, prevArrow: '.supporters-arrow-left', nextArrow: '.supporters-arrow-right', slidesToScroll: 1, fadeSpeed: 1000 };

  constructor(private route: ActivatedRoute, private contestService: ContestService) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.contestService.getWhereId(id))
    ).subscribe(res => {
      if (res.status == true) {
        this.contestDetail = res.payload;
        if (this.contestDetail) {
          this.status = 'done';
        }
      }

      this.contestService.getWhereMajor(this.contestDetail.major_id).subscribe(res => {
        this.contestRelated = res.payload.data.filter((item: any) => {
          return item.id != this.contestDetail.id;
        })
        if (this.contestRelated) {
          this.statusContestRelated = true;
        }

      })

    });

    // Get các cuộc thi liên quan


    this.routeStateRegister = history.state.registerNow;
  }

}
