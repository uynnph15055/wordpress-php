import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Contest } from 'src/app/models/contest';
import { ContestService } from 'src/app/services/contest.service';
import { Major } from 'src/app/models/major';
import { MajorService } from 'src/app/services/major.service';
import { ResultMajor } from 'src/app/models/result-major.model';
import { RankStudentComponent } from 'src/app/modal/rank-student/rank-student.component';
import {MatDialog} from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.models';
import { NgToastService } from 'ng-angular-popup';
import { ConfigViewService } from 'src/app/services/config-view.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    majors: Array<Major>;
    statusResultMajor: boolean = false;
    users: Array<User>;
    loggedInUser: User;
    contests: Array<Contest>;
    nameSelectMajor: string;
    resultMajor: Array<ResultMajor>;
    loadingResultContest: boolean = false;
    statusResult: boolean = false;
    companys: Array<Company>;
    majorIdSelect : number = 1;
    nameMajor : string;
    slugMajor : string;

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

    sliderCompany = {
        "slidesToShow": 5, infinite: true, autoplay: true, arrows: true, prevArrow: '.prev-parner', nextArrow: '.next-parner', slidesToScroll: 1, fadeSpeed: 1000,
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
    }

    sliderStudentPointHight = { "slidesToShow": 3, prevArrow: '.prev-student-arrow', autoplay: true, nextArrow: '.next-student-arrow', slidesToScroll: 1, fadeSpeed: 3000, centerMode: true }
    
    constructor(private contestService: ContestService,
        private majorService: MajorService,
        private userService: UserService,
        private dialog: MatDialog,
        private companyService : CompanyService,
        private toast :NgToastService,
        private configView : ConfigViewService
        ) { }


    ngOnInit(): void {
        // let elToShow = document.querySelectorAll('.show-on-scroll')
        // if (this.userService.getUserValue().id) {
        //     this.getListHasAfterLogin();
        // } else {
        //     this.contestService.getWhereStatus(1 , 'desc').subscribe(res => {
        //         if (res.status == true) {
        //             this.contests = res.payload.data;
        //         }
        //     })
        // }   

        // let studentStatistic = document.querySelector('.section_plan-student');
        // let yearStatistic = document.querySelector('.section_plan-year');
        // let passStatistic = document.querySelector('.section_plan-pass');

        // this.configView.activityStrollView(elToShow);

        // this.configView.runStatisticHome(studentStatistic, 10);
        // this.configView.runStatisticHome(yearStatistic, 4000);
        // this.configView.runStatisticHome(passStatistic, 2000);
   
        // // Run get all major
        // this.getAllMajor();
        // this.getAllCompany();
        // this.changMajor();
    }

    // //Get api all major
    // getAllMajor() {
    //     this.majorService.getAll().subscribe(res => {
    //          this.majors = res.status ? res.payload : null; 
    //     })
    // }

    // // Get api list contest after login
    // getListHasAfterLogin() {
    //     this.userService.getListContestHasJoin(1 , 'desc').subscribe(res => {
    //         res.status ? this.contests = res.payload.data : this.contests;
    //     })
    // }

    // // Open api rank student
    // openRankStudent() {
    //     this.nameMajor =  this.majors ? this.majors.filter(item => item.slug == this.slugMajor ? item.name : '')[0].name : '';
    //     this.resultMajor.length > 0  ?  
    //     this.dialog.open(RankStudentComponent, {
    //         width: '450px',
    //         data: { rank: this.resultMajor ,nameMajor: this.nameMajor },
    //     }) : 
    //     this.toast.info({ summary: 'Chưa xếp hạng chuyên ngành này !!!', duration: 3000})
    // }

    // // UI parner of company
    // getTabsParner(event: any ,tabName:string){
    //    const assContent =  document.querySelectorAll('.assess-content-wrapper');
    //    const avatarAssess =  document.querySelectorAll('.avatar-company');
    //    for (let i = 0; i < assContent.length; i++) {
    //      assContent[i].classList.remove('active');
    //    }
    //    for (let i = 0; i < avatarAssess.length; i++) {
    //     avatarAssess[i].classList.remove('display');
    //   }
    //    event.currentTarget.classList.add('display');
    //    document.querySelector('#' + tabName)?.classList.add('active');
    // }

    // // Get api recruitments
    // getAllCompany(){
    //     this.companyService.getAllCompany().subscribe(res =>{
    //         this.companys = res.dataContest;
    //     })
    // }

    // // Change major major
    // changMajor(event: any = null){
    //     this.statusResult = true;
    //     let slug = 'cong-nghe-thong-tin';
    //     slug = !event ? slug : event.target.value;
    //     this.slugMajor =  slug;
    //     this.resultMajor = [] ;
    //     this.majorService.getResultWhereMajor(slug).subscribe(res => {
    //         if(res.status){
    //            setTimeout(() => {
    //             this.statusResult = false;
    //             this.resultMajor = res.payload;     
    //             this.resultMajor && this.changeClassNameSlider();        
    //            }, 2000);
    //         }
    //     })
    // }


    // // Change class name slider result rank student
    // changeClassNameSlider(){
    //     const sliderRank = document.querySelector('.slider-rank-student');
    //     if(this.resultMajor.length == 1){
    //         sliderRank?.classList.add('slick-slide-student-first');
    //     }else if(this.resultMajor.length == 2){
    //         sliderRank?.classList.add('slick-slide-student-two');
    //     }else if(this.resultMajor.length == 3){
    //         sliderRank?.classList.add('slick-slide-student-three');
    //     }else{
    //         sliderRank?.classList.add('slick-slide-student-more');
    //     }
    // }
  
}
