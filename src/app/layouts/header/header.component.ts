import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  statusWindow: boolean = false;
  statusLogin: boolean = false;
  constructor(private userInfo: GetValueLocalService) { }

  ngOnInit(): void {
    this.user = this.userInfo.getValueLocalUser('user');
    if (this.user) {
      this.statusLogin = true;
    }
  }


  // LogOut
  logOut() {
    localStorage.clear();
    this.statusLogin = false;
    this.ngOnInit();
  }
}
