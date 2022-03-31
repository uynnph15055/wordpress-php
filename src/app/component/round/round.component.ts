import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  @Input() forwardComponent: any;
  @Output() roundDetail = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  forwardRoundDetail() {
    this.roundDetail.emit();
  }
}
