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
  contestDetail: Array<Contest> = [];
  contentItem: Array<Contest> = [];
  closeResult: string;
  status: any = 'pending';
  routeStateRegister: any = false;
  contest_id: any = 0;

  sliderSupporter = { "slidesToShow": 3, dots: true, infinite: true, autoplay: true, arrows: true, prevArrow: '.supporters-arrow-left', nextArrow: '.supporters-arrow-right', slidesToScroll: 1, fadeSpeed: 1000 };

  constructor(private route: ActivatedRoute, private contestService: ContestService) {
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
    })
  }

  ngOnInit(): void {
    this.routeStateRegister = history.state.registerNow;
  }

}
