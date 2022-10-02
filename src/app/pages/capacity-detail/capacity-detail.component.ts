import { ActivatedRoute, Router } from "@angular/router";
import { CapacityService } from "./../../services/capacity.service";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Capacity } from "src/app/models/capacity";
import { Round } from "src/app/models/round.model";
import { NgToastService } from "ng-angular-popup";
import { Enterprise } from "src/app/models/enterprise.model";
import { UserService } from "src/app/services/user.service";
import { RoundService } from "src/app/services/round.service";
import { Post } from "src/app/models/post.model";
import { ListPostService } from "src/app/services/list-post.service";

@Component({
  selector: "app-capacity-detail",
  templateUrl: "./capacity-detail.component.html",
  styleUrls: ["./capacity-detail.component.css"],
})
export class CapacityDetailComponent implements OnInit {
  tabActive!: string;
  capacity!: Capacity;
  // bài test liên quan
  capacityRelated!: Capacity[];
  posts!: Post[];
  isFetchingCapacity = false;
  isFetchingCapacityRelated = false;
  isFetchingNextRound = false;
  isFetchingPost = false;
  isLogged = false;
  isDoneExam = false; // trạng thái hoàn thành bài test
  rounds!: Round[];
  countDown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  statusExam!: {
    status: number;
    statustext: string;
  };
  enterprises!: { id: number; name: string; logo: string }[];
  nextRoundId: number;

  constructor(
    private modalService: NgbModal,
    private capacityService: CapacityService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService,
    private userService: UserService,
    private roundService: RoundService,
    private postService: ListPostService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.scrollToTop();
      this.isFetchingCapacity = true;
      this.isFetchingCapacityRelated = true;
      this.isFetchingPost = true;

      const { capacity_id } = params;

      this.capacityService.getWhereId(capacity_id).subscribe((res) => {
        if (res.status) {
          this.isFetchingCapacity = false;
          this.capacity = res.payload;
          this.rounds = res.payload.rounds.map((round: Round) => {
            const isFinished = new Date().getTime() > new Date(round.end_time).getTime(); //vòng thi đã kết thúc

            round["isRoundFinish"] = isFinished;
            return round;
          });

          // get ds doanh nghiệp, xóa DN trùng lặp
          this.enterprises = res.payload.recruitment_enterprise.reduce((result: Enterprise[], item: Enterprise) => {
            const exitsEnterprise = result.some((enterprice) => enterprice.id === item.id);

            if (!exitsEnterprise) result.push(item);
            return result;
          }, []);

          // bài test liên quan
          this.capacityService.getRelated({ capacity_id: this.capacity.id, limit: 3 }).subscribe((response) => {
            this.isFetchingCapacityRelated = false;

            if (response.status) {
              this.capacityRelated = response.payload.data;
            }
          });

          // bài viết liên quan
          this.postService
            .getPostsByParam({
              capacity_id,
              post: "post_capacity",
              limit: 3,
            })
            .subscribe(
              (res) => {
                this.isFetchingPost = false;
                this.posts = res.payload.data;
              },
              () => (this.isFetchingPost = false),
            );

          // đếm ngược thời gian khi bài test sắp diễn ra
          const status = new Date().getTime() < new Date(this.capacity.date_start).getTime();
          status && this.countDownTimer();

          // get trạng thái bài test
          this.getStatusCapacity();
        }
      });

      // get vòng thi tiếp theo khi click btn tham gia ngay nếu đã đăng nhập
      this.isLogged = !!(this.userService.getJwtToken() && this.userService.getUserValue());
      if (this.isLogged) {
        this.isFetchingNextRound = true;
        this.roundService.getNextRound(capacity_id).subscribe(
          ({ status, payload }) => {
            this.isFetchingNextRound = false;

            if (status) {
              this.nextRoundId = payload.id;
            }
          },
          () => {
            this.isFetchingNextRound = false;
            this.isDoneExam = true;
          },
        );
      }
    });
  }

  openModalDesc(content: Object) {
    this.modalService.open(content, { scrollable: true });
  }

  scrollToElement(el: HTMLElement, activeItem: string) {
    this.tabActive = activeItem;

    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  // get trạng thái bài test
  getStatusCapacity() {
    const today = new Date().getTime();
    const timeDateStart = new Date(this.capacity.date_start).getTime();
    const timeDateEnd = new Date(this.capacity.register_deadline).getTime();

    if (today < timeDateStart) {
      this.statusExam = {
        status: 0,
        statustext: "Sắp diễn ra",
      };
    } else if (today >= timeDateStart && today <= timeDateEnd) {
      this.statusExam = {
        status: 1,
        statustext: "Đang diễn ra",
      };
    } else if (today > timeDateEnd) {
      this.statusExam = {
        status: 2,
        statustext: "Đã kết thúc",
      };
    }
  }

  // đếm ngược thời gian
  countDownTimer() {
    let timerId: any;

    timerId = setInterval(() => {
      let futureDate = new Date(this.capacity.date_start).getTime();

      let today = new Date().getTime();
      let distance = futureDate - today;
      if (distance < 0) {
        this.countDown.days = 0;
        this.countDown.hours = 0;
        this.countDown.minutes = 0;
        this.countDown.seconds = 0;
        this.statusExam = {
          status: 1,
          statustext: "Đang diễn ra",
        };
        clearInterval(timerId);
      } else {
        this.countDown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.countDown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.countDown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.countDown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

  // vào bài thi đầu tiên
  handleGoToNextRound() {
    if (this.statusExam.status === 1) {
      if (!this.rounds.length) {
        this.toast.warning({ summary: "Chưa có bài thi nào", duration: 3000 });
        return;
      }

      if (this.isLogged && !this.isDoneExam) {
        this.router.navigate(["/test-nang-luc/vao-thi", this.capacity.id, "bai-thi", this.nextRoundId]);
        return;
      }

      this.router.navigate(["/test-nang-luc/vao-thi", this.capacity.id, "bai-thi", this.rounds[0].id]);
    }
  }

  // scroll top
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
