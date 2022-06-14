import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ConfigViewService } from 'src/app/services/config-view.service';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.css']
})


export class HomeLayoutComponent implements OnInit {
    user: User;
    statusWindow: boolean = false;
    statusLogin: boolean = false;
    randomUserUrl = 'https://api.randomuser.me/?results=5';
    searchChange$ = new BehaviorSubject('');
    optionList: string[] = [];
    selectedUser?: string;
    isLoading = false;

    constructor(private userInfo: GetValueLocalService, private configView: ConfigViewService,
        private http: HttpClient) {

    }

    onSearch(value: any): void {
        this.isLoading = true;
        this.searchChange$.next(value);
    }

    ngOnInit(): void {
        this.backTop();

        this.user = this.userInfo.getValueLocalUser('user');
        if (this.user) {
            console.log(this.user);

            this.statusLogin = true;
        }

        this.winBackTop();
        window.addEventListener('scroll', () => {
            this.winBackTop();
            this.headerBlockScroll();
        })

    }

    winBackTop() {
        let windowScroll = window.scrollY;
        if (windowScroll > 0) {
            this.statusWindow = true;
        } else {
            this.statusWindow = false;
        }
    }

    headerBlockScroll() {
        let header = document.querySelector('.header');
        if (window.scrollY > 400) {
            header?.classList.add('fixed');
        } else {
            header?.classList.remove('fixed');
        }
    }


    // Chuyển trạng thái web về đầu trang
    backTop() {
        $('html , body').animate({
            scrollTop: 0
        }, 1000);
    }

    // LogOut
    logOut() {
        localStorage.clear();
        this.statusLogin = false;
        this.ngOnInit();
    }
}