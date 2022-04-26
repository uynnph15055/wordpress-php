import { Component, OnInit } from '@angular/core';

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

  statusLogin: boolean = false;
  constructor(private userInfo: GetValueLocalService, private configView: ConfigViewService) {

  }


  ngOnInit(): void {
    this.user = this.userInfo.getValueLocalUser('user');
    if (this.user) {
      this.statusLogin = true;
    }

    let wrapperBox = document.querySelector('#main-wrapper');

    window.addEventListener('scroll', () => {
      console.log(wrapperBox?.scrollTop.valueOf());

    })
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

  }
}
