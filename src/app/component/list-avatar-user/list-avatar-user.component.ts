import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list-avatar-user',
  templateUrl: './list-avatar-user.component.html',
  styleUrls: ['./list-avatar-user.component.css']
})

export class ListAvatarUserComponent implements OnInit {
  viewMore: number;
  lengthTeam: 0;
  avatarTeam: Array<any>;
  round_id: number;
  @Input() listTeam: any;

  
  @Input() titleModelName: String = "";

  constructor(private modalService: NgbModal) { }


  ngOnInit(): void {
    this.lengthTeam = this.listTeam.length;

    if (this.lengthTeam > 5) {
      this.viewMore = this.lengthTeam - 5;
    }

    this.avatarTeam = this.listTeam.slice(0, 4);
  }

  // Mở modal danh sách các user 
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { scrollable: true });
  }

}
