import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contest-detail-header',
  templateUrl: './contest-detail-header.component.html',
  styleUrls: ['./contest-detail-header.component.css']
})
export class ContestDetailHeaderComponent implements OnInit {
  contest: any = [];

  @Input() contestDetail: any;
  @Input() roundDetail: any;
  @Input() status: any;


  constructor() { }

  ngOnInit(): void {
  }

}
