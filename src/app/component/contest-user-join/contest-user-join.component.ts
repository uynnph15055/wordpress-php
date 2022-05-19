import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contest-user-join',
  templateUrl: './contest-user-join.component.html',
  styleUrls: ['./contest-user-join.component.css']
})
export class ContestUserJoinComponent implements OnInit {
  listContestByUser: Array<Contest>;
  statusListContests: boolean = false;
  
  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.usersService.getContestByUser().subscribe(res => {
      if (res.status)
        this.listContestByUser = res.payload;
      this.listContestByUser ? this.statusListContests = true : this.statusListContests
    })
  }
}
