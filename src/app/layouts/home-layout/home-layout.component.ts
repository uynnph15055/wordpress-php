import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  constructor() {
    $(window).scroll(() => {
      if ($(this).scrollTop()) {
        $('.back-top').fadeIn();
      } else {
        $('.back-top').fadeOut();
      }
    });
  }

  ngOnInit(): void {
  }

  backTop() {
    $('html , body').animate({
      scrollTop: 0
    }, 1000);
  }

}
