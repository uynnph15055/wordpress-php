import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contest-detail-header',
  templateUrl: './contest-detail-header.component.html',
  styleUrls: ['./contest-detail-header.component.css']
})
export class ContestDetailHeaderComponent implements OnInit {
  @Input() contestDetail: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.contestDetail);
  }

}
