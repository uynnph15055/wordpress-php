import { Component, Input, OnInit } from '@angular/core';
import { ResultRound } from 'src/app/models/result-round.model';
import { RoundService } from 'src/app/services/round.service';

@Component({
  selector: 'app-list-result-round',
  templateUrl: './list-result-round.component.html',
  styleUrls: ['./list-result-round.component.css']
})

export class ListResultRoundComponent implements OnInit {
  @Input() round_id: number;
  dataResultRound: Array<ResultRound>
  statusResultRound: boolean = false;
  constructor(private roundService: RoundService) { }

  ngOnInit(): void {
    this.roundService.getResultRound(this.round_id).subscribe(res => {
      if (res.payload) {
        this.dataResultRound = res.payload;
        this.dataResultRound = this.dataResultRound.filter((item: any, index: any) => {
          return index < 11;
        })
        this.dataResultRound ? this.statusResultRound = true : this.statusResultRound;
      }
    })
  }

  displayedColumns: string[] = ['rank', 'avatar', 'name', 'total-point'];

}
