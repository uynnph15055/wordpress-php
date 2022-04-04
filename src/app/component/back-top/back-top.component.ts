import { Component, OnInit, Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.css']
})

export class BackTopComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {

  }

  backTop() {
    alert('Nguyễn Ngọc Uy');
  }

}
