import { Component, OnInit, Inject, Injectable } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.css']
})

export class BackTopComponent implements OnInit {


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
    }, 2000);
  }

}
