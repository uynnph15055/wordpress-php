import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  listTeam: any = [];
  @Input() contestDetail: any;
  @Input() status: any;


  constructor() { }

  ngOnInit(): void {

  }

  getMembers(teams: Array<Team> = []): number {
    let totalMember = 0;
    teams.forEach(t => {
      if (t.members != undefined) {
        totalMember += t.members.length;
      }
    });
    return totalMember;
  }
}
