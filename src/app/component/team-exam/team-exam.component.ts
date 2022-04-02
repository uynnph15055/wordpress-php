import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-team-exam',
  templateUrl: './team-exam.component.html',
  styleUrls: ['./team-exam.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class TeamExamComponent implements OnInit {

  @Input() roundDetail: any;
  round: any = [];
  listMember: any = [];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.round = this.roundDetail[0];
  }

  openVerticallyCentered(content: any, listMember: any) {
    this.modalService.open(content, { centered: true });
    this.listMember = listMember;
  }

  getMembers(teams: Array<Team> = []): number {
    let totalMember = 0;
    teams.forEach(t => {
      totalMember++;
    });
    return totalMember;
  }

}
