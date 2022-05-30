import { Component, Input, OnInit } from '@angular/core';
import { ResultRound } from 'src/app/models/result-round.model';
import { ConfigFunctionService } from 'src/app/services/config-function.service';
import { RoundService } from 'src/app/services/round.service';

@Component({
  selector: 'app-list-result-round',
  templateUrl: './list-result-round.component.html',
  styleUrls: ['./list-result-round.component.css']
})

export class ListResultRoundComponent implements OnInit {
  @Input() round_id: number;
  @Input() contest_id: number;
  dataResultRound: Array<any>;
  statusResultRound: boolean = true;
  titleResult: string = "Kết quả chung cuộc";
  constructor(private roundService: RoundService,
    private configFunctionService: ConfigFunctionService) { }

  ngOnInit(): void {
    this.round_id ?
      this.titleResult = "Kết quả vòng thi" : this.titleResult;

    this.roundService.getResultRound(this.round_id).subscribe(res => {
       console.log(res);
      if (res.payload.length > 0) {
        this.dataResultRound = res.payload;
        this.dataResultRound.filter((item: any, index: any) => {
          return index < 11;
        })
        this.dataResultRound ? this.statusResultRound = true : this.statusResultRound;
      }
    })
  }

  sortRankTeam(result_id: number): number {
    return this.configFunctionService.indexTable(result_id, this.dataResultRound);
  }

  displayedColumns: string[] = ['rank', 'avatar', 'name', 'total-point'];

}
