import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contest-deatail',
  templateUrl: './contest-deatail.component.html',
  styleUrls: ['./contest-deatail.component.css'],
})


export class ContestDeatailComponent implements OnInit {
  forwardComponent: Array<any> = [];
  closeResult: string;
  display = '';

  constructor() { }

  roundDetailNow() {
    this.display = 'block';
  }

  ngOnInit(): void {
    console.log
  }




}
