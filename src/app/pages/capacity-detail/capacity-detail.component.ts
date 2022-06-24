import { ActivatedRoute } from '@angular/router';
import { CapacityService } from './../../services/capacity.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Capacity } from 'src/app/models/capacity';
import { map, switchMap } from 'rxjs';
import * as moment from 'moment';
import { Round } from 'src/app/models/round.model';

@Component({
  selector: 'app-capacity-detail',
  templateUrl: './capacity-detail.component.html',
  styleUrls: ['./capacity-detail.component.css']
})
export class CapacityDetailComponent implements OnInit {

  tabActive!: string;
  capacity!: Capacity;
  rounds!: Round[];
  countDown: {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  statusExam!: {
    status: number,
    statustext: string
  };

  constructor(
    private modalService: NgbModal,
    private capacityService: CapacityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['capacity_id']),
      switchMap(id => this.capacityService.getWhereId(id))
    ).subscribe(res => {
      if (res.status) {
        this.capacity = res.payload;
        this.rounds = res.payload.rounds;

        // đếm ngược thời gian
        this.countDownTimer();

        // get trạng thái bài test
        this.getStatusCapacity();
      }
    })
  }

  openModalDesc(content: Object) {
    this.modalService.open(content, { scrollable: true })
  }

  scrollToElement(el: HTMLElement, activeItem: string) {
    this.tabActive = activeItem;

    let offsetTop = el.offsetTop;
    if (activeItem === 'testRelated') {
      offsetTop -= 150;
    }

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }

  // get trạng thái bài test
  getStatusCapacity() {
    const today = new Date().getTime();
    const timeDateStart = new Date(this.capacity.date_start).getTime();
    const timeDateEnd = new Date(this.capacity.register_deadline).getTime();

    if (today < timeDateStart) {
      this.statusExam = {
        status: 0,
        statustext: "Sắp diễn ra"
      }
    } else if (today >= timeDateStart && today <= timeDateEnd ) {
      this.statusExam = {
        status: 1,
        statustext: "Đang diễn ra"
      }
    } else if (today > timeDateEnd) {
      this.statusExam = {
        status: 2,
        statustext: "Đã kết thúc"
      }
    }
  }

  // đếm ngược thời gian
  countDownTimer() {
    let timerId: any;

    timerId = setInterval(() => {
      const timeStart = moment(this.capacity.date_start).format('lll');

      let futureDate = new Date(timeStart).getTime();

      let today = new Date().getTime();
      let distance = futureDate - today;
      if (distance < 0) {
        this.countDown.days = 0;
        this.countDown.hours = 0;
        this.countDown.minutes = 0;
        this.countDown.seconds = 0;
        this.statusExam = {
          status: 1,
          statustext: "Đang diễn ra"
        }
        clearInterval(timerId);

      } else {
        this.countDown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.countDown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.countDown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.countDown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

}
