import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-avatar-user',
  templateUrl: './list-avatar-user.component.html',
  styleUrls: ['./list-avatar-user.component.css']
})

export class ListAvatarUserComponent implements OnInit {
  viewMore: any;
  lengthTeam: 0;
  avatarTeam: any;
  round_id: any;
  @Input() listTeam: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.listTeam);

    this.lengthTeam = this.listTeam.length;

    if (this.lengthTeam > 4) {
      this.viewMore = this.lengthTeam - 4;
    }

    this.avatarTeam = this.listTeam.slice(0, 3);
    // this.round_id = this.listTeam[0].pivot.round_id;
  }

}
