import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { User } from 'src/app/models/user';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {
  user: User;
  statusLogin: boolean = false;
  constructor(private userInfo: GetValueLocalService) {
    $(window).scroll(() => {
      if ($(this).scrollTop()) {
        $('.back-top').fadeIn();
      } else {
        $('.back-top').fadeOut();
      }
    });
  }

  ngOnInit(): void {
    this.user = this.userInfo.getValueLocalUser('user');
    if (this.user) {
      this.statusLogin = true;
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

  }
}
