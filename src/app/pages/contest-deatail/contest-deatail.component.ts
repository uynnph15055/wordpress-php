import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  contest_id: any = 0;

  constructor(private route: ActivatedRoute, private contestService: ContestService) { }

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
    })
  }

  listCompany: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    responsive: {
      300: {
        items: 3
      },
      576: {
        items: 3
      },
      978: {
        items: 3
      },
      1024: {
        items: 3
      }
    },
    nav: true
  }

}
