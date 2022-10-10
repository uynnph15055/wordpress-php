import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultRound } from 'src/app/models/result-round.model';
import { Round } from 'src/app/models/round.model';
import { ConfigFunctionService } from 'src/app/services/config-function.service';
import { ContestService } from 'src/app/services/contest.service';
import { RoundService } from 'src/app/services/round.service';

@Component({
  selector: 'app-list-result-round',
  templateUrl: './list-result-round.component.html',
  styleUrls: ['./list-result-round.component.css'],
})
export class ListResultRoundComponent implements OnInit {
  @Input() roundResult: Array<ResultRound>;
  @Input() links: Array<any>;
  @Input() next: string;
  @Input() prev: string;
  @Input() statusLinks: boolean;

  @Output() payingResult = new EventEmitter<string>();
  @Output() payingResultSort = new EventEmitter<boolean>();


  statusSort : boolean = true;  

  
  constructor(
    private configFunctionService: ConfigFunctionService,
  ) {}

  ngOnInit(): void {
 
  }

  payingResultEvent(url : string){
    if(url){
      this.payingResult.emit(url);
    }
  }

  payingResultEventSort(status: boolean){
    this.statusSort = status;
    this.payingResultSort.emit(status);
  }
}
