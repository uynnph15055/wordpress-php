import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/models/sponsor';
import { User } from 'src/app/models/user';
import { SponsorService } from 'src/app/services/sponsor.service';
import { UserService } from 'src/app/services/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Contest } from 'src/app/models/contest';
import { Team } from 'src/app/models/team';
import { ContestService } from 'src/app/services/contest.service';
import { ConfigViewService } from 'src/app/services/config-view.service';
import { Major } from 'src/app/models/major';
import { MajorService } from 'src/app/services/major.service';
import { ResultRound } from 'src/app/models/result-round.model';
import { ResultMajor } from 'src/app/models/result-major.model';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    majors: Array<Major>;
    selectedMajor: string;
    isLoading = false;
    statusResultMajor: boolean = false;
    users: Array<User>;
    loggedInUser: User;
    sponsors: Array<Sponsor>;
    contests: Array<Contest>;
    item: Contest;
    nameSelectMajor: string;

    resultMajor: Array<ResultMajor>;
    loadingResultContest: boolean = false;
    statusResult: boolean = false;

    sliderContest = {
        "slidesToShow": 4, infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-arrow', nextArrow: '.next-arrow', slidesToScroll: 1, fadeSpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 586,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    sliderStudentPointHight = { "slidesToShow": 3, prevArrow: '.prev-student-arrow', autoplay: true, nextArrow: '.next-student-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true };

    sliderAssessCompacity = {
        "slidesToShow": 1, autoplay: true, prevArrow: '.prev-compacity-arrow', nextArrow: '.next-compacity-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true, fade: true,
        cssEase: 'linear'
    };

    constructor(private contestService: ContestService,
        private configView: ConfigViewService,
        private majorService: MajorService,
        private UserService: UserService,
        private http: HttpClient) { }


    ngOnInit(): void {
        let elToShow = document.querySelectorAll('.show-on-scroll')
        // Lấy ra tất cả các cuộc thi
        if (this.UserService.getUserValue().id !== undefined) {
            this.getListHasAfterLogin();
        } else {
            this.contestService.getWhereStatus(1).subscribe(res => {
                if (res.status == true) {
                    this.contests = res.payload.data;
                }
            })
        }


        // Config giao dien
        let studentStatistic = document.querySelector('.section_plan-student');
        let yearStatistic = document.querySelector('.section_plan-year');
        let passStatistic = document.querySelector('.section_plan-pass');

        this.configView.activityStrollView(elToShow);

        this.configView.runStatisticHome(studentStatistic, 10);
        this.configView.runStatisticHome(yearStatistic, 4000);
        this.configView.runStatisticHome(passStatistic, 2000);


        // Get All Major
        this.getAllMajor();
    }

    //Lấy ra tất cả các chuyên ngành
    getAllMajor() {
        this.majorService.getAll().subscribe(res => {
            if (res.status) {
                this.majors = res.payload;
                this.nameSelectMajor = this.majors[0].name;
                this.getResultWhereMajor(this.majors[0].slug);
            }
        })
    }

    // Gọi kết quả theo chuyên ngành.
    getResultWhereMajor(majorSlug: any) {
        this.loadingResultContest = false;
        this.statusResult = false;
        this.majorService.getResultWhereMajor(majorSlug).subscribe(res => {
            if (res.status) {
                this.resultMajor = res.payload;
                console.log(this.resultMajor);
                this.resultMajor ? this.loadingResultContest = true : this.loadingResultContest;
                this.resultMajor.length == 0 ? this.statusResult : this.statusResult = true;
            }
        })
    }

    // get list contest after login
    getListHasAfterLogin() {
        this.contestService.getListContestHasJoin().subscribe(res => {
            res.status ? this.contests = res.payload.data : this.contests;
        })
    }



    /* eslint-disable @typescript-eslint/no-explicit-any */
    loadMore(): void {
        this.isLoading = true;
        this.majorService.getAll().subscribe(res => {
            if (res.status) {
                this.isLoading = false;
                this.majors = res.payload;
                let majorRandom = Math.floor(Math.random() * this.majors.length);
                this.selectedMajor = this.majors[majorRandom].name;
                this.getResultWhereMajor(this.majors[majorRandom].slug);
            }
        })
    }
}
